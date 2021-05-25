from app.models import buildingType, db, Posting
from faker import Faker
from random import randint

fake = Faker()

geo =[
  { 'lat': 32.1656221, 'lng': -82.9000751 },
  { 'lat': 32.1656221, 'lng': -82.9000751 },
  { 'lat': 38.8026097, 'lng': -116.419389 },
  { 'lat': 35.6809165, 'lng': -94.17520569999999 },
  { 'lat': 42.6682004, 'lng': -71.9282781 },
  { 'lat': 38.5976262, 'lng': -80.4549026 },
  { 'lat': 34.5745999, 'lng': -80.0459001 },
  { 'lat': 33.47144460000001, 'lng': -81.98749719999999 },
  { 'lat': 44.3148443, 'lng': -85.60236429999999 },
  { 'lat': 44.3148443, 'lng': -85.60236429999999 },
  { 'lat': 10.3762299, 'lng': 123.9394414 },
  { 'lat': 46.8796822, 'lng': -110.3625658 },
  { 'lat': 33.836081, 'lng': -81.1637245 },
  { 'lat': 32.3182314, 'lng': -86.902298 },
  { 'lat': 45.1224754, 'lng': -121.7840389 },
  { 'lat': 40.7127753, 'lng': -74.0059728 },
  { 'lat': 43.18645009999999, 'lng': -77.8038972 },
  { 'lat': 30.267153, 'lng': -97.7430608 },
  { 'lat': 30.4065868, 'lng': -87.6835974 },
  { 'lat': 43.030576, 'lng': -86.207155 },
  { 'lat': 40.6331249, 'lng': -89.3985283 },
  { 'lat': 30.179917, 'lng': -95.50107 },
  { 'lat': 37.29853000000001, 'lng': -86.86218269999999 },
  { 'lat': 29.7604267, 'lng': -95.3698028 },
  { 'lat': 36.2399937, 'lng': -84.10392619999999 },
  { 'lat': 43.7844397, 'lng': -88.7878678 },
  { 'lat': 44.2599903, 'lng': -70.2912198 },
  { 'lat': 34.5199402, 'lng': -105.8700901 },
  { 'lat': 28.927019, 'lng': -82.0037608 },
  { 'lat': 38.8026097, 'lng': -116.419389 },
  { 'lat': 46.8796822, 'lng': -110.3625658 },
  { 'lat': 37.4315734, 'lng': -78.6568942 },
  { 'lat': 41.7859079, 'lng': -76.7880114 },
  { 'lat': 40.0583238, 'lng': -74.4056612 },
  { 'lat': 38.9177347, 'lng': -94.66959899999999 },
  { 'lat': 44.0601788, 'lng': -84.48764849999999 },
  { 'lat': 39.4659619, 'lng': -76.6289968 }
]

addresses = ['2410 Adams Walks Suite 908, Andersonburgh, CO 67301', '37759 Courtney Row, Starkport, GA 18568', '076 Todd Cliffs, Port Jeffrey, VA 43840', '578 Lamb Pines Suite 035, Markside, WI 24741', '8783 Austin Hill Apt. 612, East Patriciaside, CT 45064', '67379 Joseph Tunnel Apt. 782, East Kaylaport, MD 09248', '99328 Leon Gardens, East Kelly, SC 35135', '355 Clark Keys, Ashleyhaven, HI 01021', '94901 Norris Dam, Robertburgh, MN 00550', '97077 Garrett Summit Apt. 508, Jonesfort, AL 89359', '355 Johnson Ranch, South Mary, IL 44589', '20188 Kim Wall Apt. 264, Jacquelinemouth, WV 56012', '1423 Jerry Spring, New Nicoleville, NY 93994', '037 Michelle Circle Suite 048, Port Davidborough, MI 00618', '3050 Schmidt Shoal Suite 669, South Stephenberg, DE 37577', '987 Sanchez Parks, Barnettmouth, GA 69442', '0739 Wright Throughway Suite 444, Hebertview, KS 22139', '62288 Jones Tunnel Suite 719, North Jaime, TN 89106', '52871 Timothy Loop, New Christopher, VT 14912', '66844 Hall Tunnel, East Destinychester, AR 89937', '2512 Michelle Center Apt. 927, Lamberg, MT 84045', '8918 Kathleen Parks, Port Brandi, MT 64601', '01430 Maldonado Grove, East Caitlynside, ME 56523', '66210 Whitaker Trace Apt. 855, North Christopherview, KS 09724', '509 Hart Hollow, Antonioville, ND 11724', '74530 Megan Rapids Suite 132, Mistyhaven, LA 89512', '095 Rogers Stream Suite 254, Morenoside, NV 43310', '6957 Jennifer Roads Suite 289, North Sandra, OH 64301', '20538 Gonzalez Points Suite 171, Brandyton, MI 49921', '42320 Peters Course Suite 352, New Tinafort, PA 72582', '52309 Martin Stream Apt. 282, Chandlerton, SD 42405', '778 Sandoval Landing, Murphybury, CT 76600', '51428 Vargas Squares Suite 779, West Madelineborough, OK 30232', '7293 Houston Well Suite 915, Port David, KS 72571', '68814 Harper Street, Petersland, IN 67037', '154 Allison Vista Suite 202, Kristinborough, NJ 04720', '26183 Rachel Street, South Patrick, SC 30399', '9557 Haynes Crossroad, Wigginsfurt, NM 28210', '314 Julia Crest Apt. 228, West Troyborough, MT 51067', '18040 Foley Light Apt. 697, New Aaron, OR 09523', '4738 Duke Valley Apt. 173, Nicholsview, NV 91190', '6674 Lee Villages, Lake Cathy, IN 74978', '960 Boyd Loaf Suite 613, Spencerfort, MD 05325', '71490 Hunt Club, Carolynmouth, MD 93586']
cities = ['Andersonburgh', 'Starkport', 'Port Jeffrey', 'Markside', 'East Patriciaside', 'East Kaylaport', 'East Kelly', 'Ashleyhaven', 'Robertburgh', 'Jonesfort', 'South Mary', 'Jacquelinemouth', 'New Nicoleville', 'Port Davidborough', 'South Stephenberg', 'Barnettmouth', 'Hebertview', 'North Jaime', 'New Christopher', 'East Destinychester', 'Lamberg', 'Port Brandi', 'East Caitlynside', 'North Christopherview', 'Antonioville', 'Mistyhaven', 'Morenoside', 'North Sandra', 'Brandyton', 'New Tinafort', 'Chandlerton', 'Murphybury', 'West Madelineborough', 'Port David', 'Petersland', 'Kristinborough', 'South Patrick', 'Wigginsfurt', 'West Troyborough', 'New Aaron', 'Nicholsview', 'Lake Cathy', 'Spencerfort', 'Carolynmouth']
image_url = ['https://user-images.githubusercontent.com/74081636/117364726-45860e80-ae8c-11eb-836b-c37bb2252948.jpeg', 'https://user-images.githubusercontent.com/74081636/117364727-461ea500-ae8c-11eb-93e9-d129bcea15c6.jpeg','https://user-images.githubusercontent.com/74081636/117364728-461ea500-ae8c-11eb-819c-c21dedc13483.jpeg', 'https://user-images.githubusercontent.com/74081636/117364730-461ea500-ae8c-11eb-89ca-ac1c1a88cc1f.jpeg', 'https://user-images.githubusercontent.com/74081636/117364731-46b73b80-ae8c-11eb-89fd-6d97941a02f8.jpeg', 'https://user-images.githubusercontent.com/74081636/117364732-46b73b80-ae8c-11eb-8b07-ec344604ff68.jpeg', 'https://user-images.githubusercontent.com/74081636/117364733-46b73b80-ae8c-11eb-9800-f679700b6d10.jpeg', 'https://user-images.githubusercontent.com/74081636/117364734-46b73b80-ae8c-11eb-8ff0-72e0881f69a9.jpeg', 'https://user-images.githubusercontent.com/74081636/117364735-46b73b80-ae8c-11eb-9e16-96e16e65a9ba.jpeg', 'https://user-images.githubusercontent.com/74081636/117364738-474fd200-ae8c-11eb-88ae-95326fdc7029.jpeg', 'https://user-images.githubusercontent.com/74081636/117364740-474fd200-ae8c-11eb-9d55-31327724ebd9.jpeg', 'https://user-images.githubusercontent.com/74081636/117364742-474fd200-ae8c-11eb-9cd9-4bc482773feb.jpeg', 'https://user-images.githubusercontent.com/74081636/117364743-474fd200-ae8c-11eb-9c00-d5124a98af11.jpeg', 'https://user-images.githubusercontent.com/74081636/117364745-474fd200-ae8c-11eb-83ae-5321c8a1c6f1.jpeg', 'https://user-images.githubusercontent.com/74081636/117364747-47e86880-ae8c-11eb-88b5-f6ed3aa28100.jpeg', 'https://user-images.githubusercontent.com/74081636/117364748-47e86880-ae8c-11eb-95c8-62d1cb0825a4.jpeg', 'https://user-images.githubusercontent.com/74081636/117364750-47e86880-ae8c-11eb-8166-7b4a88ca6b71.jpeg', 'https://user-images.githubusercontent.com/74081636/117364751-4880ff00-ae8c-11eb-95de-b5d19929724b.jpeg', 'https://user-images.githubusercontent.com/74081636/117364753-4880ff00-ae8c-11eb-9e91-bf7eb53f24d4.jpeg', 'https://user-images.githubusercontent.com/74081636/117364754-4880ff00-ae8c-11eb-9229-8cd348e67efa.jpeg', 'https://user-images.githubusercontent.com/74081636/117364756-49199580-ae8c-11eb-9caa-6ed61d4f633e.jpeg', 'https://user-images.githubusercontent.com/74081636/117364759-49199580-ae8c-11eb-9a00-e0fe11b1207a.jpeg']
# print(len(geo))
# print(len(addresses))
# print(len(cities))
# print(geo)
# print(geo[36]['lat'])
# print(geo[1])


# formatted = ['2410+Adams+Walks+Suite+908,+Andersonburgh,+CO', '37759+Courtney+Row,+Starkport,+GA', '076+Todd+Cliffs,+Port+Jeffrey,+VA', '578+Lamb+Pines+Suite+035,+Markside,+WI', '8783+Austin+Hill+Apt.+612,+East+Patriciaside,+CT', '67379+Joseph+Tunnel+Apt.+782,+East+Kaylaport,+MD', '99328+Leon+Gardens,+East+Kelly,+SC', '355+Clark+Keys,+Ashleyhaven,+HI', '94901+Norris+Dam,+Robertburgh,+MN', '97077+Garrett+Summit+Apt.+508,+Jonesfort,+AL', '355+Johnson+Ranch,+South+Mary,+IL', '20188+Kim+Wall+Apt.+264,+Jacquelinemouth,+WV', '1423+Jerry+Spring,+New+Nicoleville,+NY', '037+Michelle+Circle+Suite+048,+Port+Davidborough,+MI', '3050+Schmidt+Shoal+Suite+669,+South+Stephenberg,+DE', '987+Sanchez+Parks,+Barnettmouth,+GA', '0739+Wright+Throughway+Suite+444,+Hebertview,+KS', '62288+Jones+Tunnel+Suite+719,+North+Jaime,+TN', '52871+Timothy+Loop,+New+Christopher,+VT', '66844+Hall+Tunnel,+East+Destinychester,+AR', '2512+Michelle+Center+Apt.+927,+Lamberg,+MT', '8918+Kathleen+Parks,+Port+Brandi,+MT', '01430+Maldonado+Grove,+East+Caitlynside,+ME', '66210+Whitaker+Trace+Apt.+855,+North+Christopherview,+KS', '509+Hart+Hollow,+Antonioville,+ND', '74530+Megan+Rapids+Suite+132,+Mistyhaven,+LA', '095+Rogers+Stream+Suite+254,+Morenoside,+NV', '6957+Jennifer+Roads+Suite+289,+North+Sandra,+OH', '20538+Gonzalez+Points+Suite+171,+Brandyton,+MI', '42320+Peters+Course+Suite+352,+New+Tinafort,+PA', '52309+Martin+Stream+Apt.+282,+Chandlerton,+SD', '778+Sandoval+Landing,+Murphybury,+CT', '51428+Vargas+Squares+Suite+779,+West+Madelineborough,+OK', '7293+Houston+Well+Suite+915,+Port+David,+KS', '68814+Harper+Street,+Petersland,+IN', '154+Allison+Vista+Suite+202,+Kristinborough,+NJ', '26183+Rachel+Street,+South+Patrick,+SC', '9557+Haynes+Crossroad,+Wigginsfurt,+NM', '314+Julia+Crest+Apt.+228,+West+Troyborough,+MT', '18040+Foley+Light+Apt.+697,+New+Aaron,+OR', '4738+Duke+Valley+Apt.+173,+Nicholsview,+NV', '6674+Lee+Villages,+Lake+Cathy,+IN', '960+Boyd+Loaf+Suite+613,+Spencerfort,+MD', '71490+Hunt+Club,+Carolynmouth,+MD']
# new_addresses = [fix_address(address) for address in addresses]
# print(new_addresses)

def seed_postings():
  count = 36
  while count >= 0:
    post = Posting(
      userId = randint(1,200),
      city = cities[count],
      address = addresses[count],
      buildingTypeId = randint(1,6),
      numGuests = randint(1,5),
      numBeds = randint(1,6),
      numBathrooms = randint(1,3),
      title = fake.text(max_nb_chars=200),
      description = fake.text(max_nb_chars=499),
      price = randint(100, 250),
      latitude = geo[count]['lat'],
      longitude = geo[count]['lng'],
      mainImageUrl = image_url[randint(0,21)]
    )
    db.session.add(post)
    db.session.commit()
    count -= 1

def undo_postings():
    db.session.execute('TRUNCATE postings RESTART IDENTITY CASCADE;')
    db.session.commit()