from flask import Flask, request, jsonify
from flask_cors import CORS
from googlesearch import search
import requests
import spacy
import time

app = Flask(__name__)
CORS(app)
nlp = spacy.load("en_core_web_sm")
links = [
# 'https://www.tripadvisor.in/Attractions-g297672-Activities-Udaipur_Udaipur_District_Rajasthan.html',
# 'https://www.tripadvisor.in/Attraction_Review-g297672-d324469-Reviews-City_Palace_of_Udaipur-Udaipur_Udaipur_District_Rajasthan.html',
# 'https://www.tripadvisor.in/Attractions-g297672-Activities-c42-Udaipur_Udaipur_District_Rajasthan.html',
# 'https://www.tripadvisor.in/Attractions-g297672-Activities-c47-t10-Udaipur_Udaipur_District_Rajasthan.html',
'https://www.tourism.rajasthan.gov.in/udaipur.html',
'https://www.holidify.com/places/udaipur/sightseeing-and-things-to-do.html',
'https://www.thrillophilia.com/places-to-visit-in-udaipur',
'https://www.makemytrip.com/tripideas/places-to-visit-in-udaipur',
'https://traveltriangle.com/blog/places-to-visit-in-udaipur/',
'https://www.fabhotels.com/blog/places-to-visit-in-udaipur/'
]


def search_blogs(query):
    queryStr = "Places to visit in " + query
    # links = []
    for j in search(queryStr, tld="co.in", num=10, stop=10, pause=2):
        print(j)
        links.append(j)
    return links

def appyhub_text_extract(links):
    base_url = "https://api.apyhub.com/extract/text/webpage?url="
    headers = {'apy-token': 'APT0fK5C2FlQNp9cCNUH8kfCIMqir0gKEK1fbPStJt1mmECgy'}

    blog_text = []

    for link in links:
        print(base_url + link)
        r = requests.get(base_url+link, headers=headers)
        out = r.json()
        time.sleep(2)
        try:
            blog_text.append(out["data"])
        except KeyError:
            print("link is inaccessible: "+link)
    return blog_text

def preprocess(text):
    text = text.strip()
    text = text.replace('\n\n', ' ')
    text = text.replace('\n', ' ')
    return text

def unique_elements(ele):
    return ele

def spacy_ner(text):
    text = preprocess(text)
    places = []
    doc = nlp(text)
    for ent in doc.ents:
        if ent.label_ == 'FAC' or ent.label_ == 'ORG':
            print (ent.text, ent.label_)
            places.append(ent.text)
    
    places = unique_elements(places)
    return places

# @app.route("/explore-city", methods=["GET"])
def explore_city():
    # data = request.get_json(force=True)
    # print(data["city_name"])
    data = {"city_name": "new york"}
    # blogLinks = search_blogs(data["city_name"])
    blogLinks = links
    blog_texts = appyhub_text_extract(blogLinks)

    for text in blog_texts:
        spacy_ner(text)
    return ""

def main():
    print(explore_city())

if __name__ == '__main__':
    main()