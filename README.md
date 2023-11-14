# Travelo
Why read through dozens of lengthy travel blogs to find out tourist attractions, when we can do it for you? 

## Overview
The search for tourist destinations is one of the steps that is generally carried out when planning a trip. Travel blogs are a significant source for describing tourist destinations. However, due to the large amount of text contained in them and description of multiple tourist attractions, reading through a travel blog is time-consuming. Also, the bulk of unstructured text makes it difficult for the visualization of textual content. Our solution uses Named Entity Recognition to identify tourist attractions from travel blogs and present them in a visually appealing way, making it easier for people to plan their travel itinerary.

### Try it out:
[Project demo link](https://youtu.be/MEo2LK8TEws)
----------------------------------
---------------------

## Inspiration
Whenever we plan to go somewhere for the first time, we have to endlessly search for places of attractions via blogs and other internet sources to visit them and make the best use of our visit. Usually, travel-related blogs have some quite insightful information because of the author's personal experience.
Another problem that we came across is that usually local businesses and providers usually are missed out if people book and plan their entire journey via some famous tourism agencies. Due to commissions involved, local people get less share than they deserve.
So with this application, we tried to solve these aforementioned problems.

## What it does?
**For Tourists:**<br/>
The most essential feature is that it reads blogs for you and gives you the locations that you should visit using Named Entity Recognition(NER), which is an NLP-based method. The user needs to enter the place or provide a blog link and our application will parse it.
It also provides those locations on a map with a path visualization among all the waypoints in the most efficient manner.
Users can click on those locations on the map and a pop-up will appear through which one can learn more about that attraction.
User has the option to look out for the local vendors as well on the same map and plan out his itinerary.<br/><br/>
**For Local business:**<br/>
You get to register on this application which lists your business on the map as well with reference to the city entered.
So, when a tourist search for a city, those local businesses will also be shown to him/her and increase the chances of their visit to those locations.
They can also add images and their details as well for insight for the visitors.

## How we built it?
* Used Google search API to get popular blogs for the location. 
* Then we used this [API](https://apyhub.com/utility/extractor-webpage-text?slug=extractor-webpage-text) from ApyHub to extract the content of those blogs and pages.
* An NLP-based technique called Name Entity Recognition is used to get the potential spots that could be visited in a particular location.
* Once this is done, we used the [Mapbox](https://docs.mapbox.com)'s maps and Directions API to get the coordinates of the spots and plot them on the map with a path. We also did the same for local vendors.
* There's an option for local business vendors to pick their locations and add their information to get listed on the application.
* Used [Twilio](https://www.twilio.com/) to notify the vendors on WhatsApp about their listing on the map.
* Used Wikipedia's API to fetch information about the places.
* **Tech Stack:**
    * Frontend: React, styled components
    * Backend: Node.js, Flask
    * Database: MongoDB


## Accomplishments we're proud of
* Completing this multi-utility application in 36 hours is something that we can pat our backs for.
* Surviving on just 2 hours of sleep and coffee is not a flex exactly, but we are still proud.
* Used tools, techniques, and APIs we never used before which took a toll on our mental health but we still passed with flying colors.

## Challenges we ran into
There were a lot of difficulties that we faced, some due to lack of enough context, unstable internet, limit reached on google search requests. Some of these were:
* Not many publically available datasets, making it difficult for us to train a model. We used the `en_core_web_sm` model from spacy for Named Entity Recognition at the end to achieve satisfactory accuracy.
* BERT model was there, which we trained, but it was a bit too heavy to be deployed in the free tier.
* Google limits the number of requests we can make, and hence we could not make a dataset of our own, and got blocked for a day.
* It was tough to integrate Mapbox GL into our application since there were a few complications we created of our own by using functional components.
* First offline hackathon, was a bit nervous (but fun) challenge too!


## What we learned
* A simple phase of ideation about how great it is to discuss your ideas with teammates and mentors.
* Research is a necessary phase and includes reading blogs, research papers, and discussing what things can be implemented.
* And much more...

## What's next for Travelo
* Preparing a full-fledged itinerary for the user including budget and date parameters.
* Using elastic search and our own data store to store and search to avoid redundant API calls for each user query of the same places.
* Build and train the NER model to improve its accuracy.


