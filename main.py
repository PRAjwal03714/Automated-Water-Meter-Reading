#Installing and Importing dependecies of database
#!pip install db-sqlite3
!pip install watchdog
!pip install twilio
#pip install PrettyTable
#import sqlite3
from prettytable import PrettyTable
#conn = sqlite3.connect('water_meter.db')
#cursor = conn.cursor()
!pip install --upgrade google-cloud-vision
!pip install mysql-connector


#Importing dependecies for image processing
import os
import time
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler
from google.cloud import vision_v1
from google.cloud.vision_v1 import types
from twilio.rest import Client 
import mysql.connector

conn = mysql.connector.connect(
    host="sql12.freesqldatabase.com",
    user="sql12670144",
    password="K3bD7tEtwE",
    database="sql12670144"
)
cursor = conn.cursor()

# Insert initial values
cursor.execute('''
    INSERT INTO Water_Meter_Readings 
    VALUES (8951488705, 146654, 147765, 7.77, 'None')
''')

# Commit the changes
conn.commit()

# Display the entire table
cursor.execute('SELECT * FROM Water_Meter_Readings')
rows = cursor.fetchall()

# Function to calculate price based on the amount
def calculate_price(amount_in_litres):
    # Convert litres to kilolitres
    amount_in_kilolitres = amount_in_litres / 1000

    # Define the pricing tiers
    tier1_limit = 8000
    tier2_limit = 25000
    tier3_limit = 50000

    # Define the prices for each tier
    price_tier1 = 7  # Rs. 7 per kilolitre
    price_tier2 = 11  # Rs. 11 per kilolitre
    price_tier3 = 25  # Rs. 25 per kilolitre
    price_tier4 = 45  # Rs. 45 per kilolitre

    # Calculate the price based on the amount
    if amount_in_kilolitres <= tier1_limit:
        total_price = amount_in_kilolitres * price_tier1
    elif tier1_limit < amount_in_kilolitres <= tier2_limit:
        total_price = (tier1_limit * price_tier1) + ((amount_in_kilolitres - tier1_limit) * price_tier2)
    elif tier2_limit < amount_in_kilolitres <= tier3_limit:
        total_price = (tier1_limit * price_tier1) + ((tier2_limit - tier1_limit) * price_tier2) + (
                (amount_in_kilolitres - tier2_limit) * price_tier3)
    else:
        total_price = (tier1_limit * price_tier1) + ((tier2_limit - tier1_limit) * price_tier2) + (
                (tier3_limit - tier2_limit) * price_tier3) + ((amount_in_kilolitres - tier3_limit) * price_tier4)

    return total_price

# Authenticate with Google Cloud Vision API
def authenticate_with_google_cloud():
    json_key_path = "/content/water-meter-408007-b6d113f11aec.json"
    os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = json_key_path

# Extract digits from the image using Google Cloud Vision API
def extract_digits_from_image(image_path):
    authenticate_with_google_cloud()
    client = vision_v1.ImageAnnotatorClient()

    with open(image_path, 'rb') as image_file:
        content = image_file.read()

    image = types.Image(content=content)
    response = client.text_detection(image=image)
    texts = response.text_annotations

    if texts:
        digits = ''.join(filter(str.isdigit, texts[0].description))
        return digits, os.path.basename(image_path)
    else:
        return None, os.path.basename(image_path)

# Database interaction and Twilio integration
def update_database_and_notify(new_reading, image_id, cursor, conn):
    cursor.execute('SELECT Current_Reading, Previous_Reading FROM Water_Meter_Readings')
    current_reading, previous_reading = cursor.fetchone()

    if new_reading < current_reading:
        print("Error: The new Current_Reading must be greater than the previous reading.")
    else:
        amount = (new_reading - current_reading)
        amount = calculate_price(amount)
        
        cursor.execute('''
            UPDATE Water_Meter_Readings
            SET Previous_Reading = %s,
                Current_Reading = %s,
                Amount = %s,
                Image_Id = %s
        ''', (current_reading, new_reading, amount, str(image_id)))

        conn.commit()
        print("Update successful.")

        # Display the entire table after update
        cursor.execute('SELECT * FROM Water_Meter_Readings')
        rows = cursor.fetchall()
        print("The amount is ", amount)

        # Send a WhatsApp message
        send_whatsapp_message("The amount is {}".format(amount))

# Send WhatsApp message using Twilio
def send_whatsapp_message(message):
    message = client.messages.create(
        body=message,
        from_='whatsapp:{}'.format(twilio_phone_number),
        to='whatsapp:{}'.format(user_phone_number)
    )
    return message.sid

# Watcher for new image files
class ImageHandler(FileSystemEventHandler):
    def on_created(self, event):
        if event.is_directory:
            return
        elif event.event_type == 'created':
            print(f"New image created: {event.src_path}")
            result, image_name = extract_digits_from_image(event.src_path)
            if result:
                update_database_and_notify(int(result[:6]), event.src_path, cursor, conn)
            else:
                print(f"No digits found in the image {image_name}.")

if _name_ == "_main_":
    # Set up Twilio credentials
    account_sid = 'ACf819f3ab51a0869c9dcd14709fcd4d0b'
    auth_token = 'b6de4e5456aed5d54df05b705e6acd1f'
    twilio_phone_number = "+14155238886"
    user_phone_number = '+918951488705'
    client = Client(account_sid, auth_token)

    # Set up Watchdog observer and handler
    #folder_to_watch = '/content/drive/MyDrive/ESP32-CAM/20231213'
    folder_to_watch = '/content/drive/MyDrive/BNMIT'
    event_handler = ImageHandler()
    observer = Observer()
    observer.schedule(event_handler, path=folder_to_watch, recursive=False)
    observer.start()

    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        observer.stop()

    observer.join()
