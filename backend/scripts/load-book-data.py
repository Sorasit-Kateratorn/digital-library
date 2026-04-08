import requests as req
import os
from dotenv import load_dotenv
import sqlite3

load_dotenv()
api_key = os.getenv("GOOGLE_BOOKS_API_KEY")


BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
db_path = os.path.join(BASE_DIR, "db.sqlite3")

conn = sqlite3.connect(db_path)
inserted_books_id = []

def convert_published(publishedDate):
    if len(publishedDate) > 4:
        return publishedDate.split("-")[0]
    return publishedDate

def insert_book(books_items, cate, indexs):
    cursor = conn.cursor()
    count = 0
    # books_items = 20 items
    for book in books_items:
        # print(book['volumeInfo']['categories'])
        volume = book.get("volumeInfo", {})
        if (
            'title' in volume
            and 'authors' in volume
            and 'categories' in volume
            and 'pageCount' in volume
            and 'publishedDate' in volume
            and 'imageLinks' in volume
            and 'thumbnail' in volume['imageLinks']
            and volume['categories'][0].lower() == cate.lower()
            and volume['pageCount'] > 0
            and book['id'] not in inserted_books_id
        ):
            #print(f"title: {book['volumeInfo']['title']}, author: {book['volumeInfo']['authors'][0]}, genre: {cate}, page: {book['volumeInfo']['pageCount']}, publish: {book['volumeInfo']['publishedDate']}, coverimage: {book['volumeInfo']['imageLinks']['thumbnail']}")
            title = volume['title']
            author = volume['authors'][0]
            genre = volume['categories'][0]
            page = volume['pageCount']
            published = convert_published(volume['publishedDate'])
            cover_image = volume['imageLinks']['thumbnail']
            
            cursor.execute("""
                INSERT INTO books
                (name, author, created_at, genre, page, published, cover_image)
                VALUES (?, ?, datetime('now'), ?, ?, ?, ?)
            """, (
                title,
                author,
                genre,
                page,
                published,
                cover_image
            ))
            
            inserted_books_id.append(book["id"])
            count +=1
    conn.commit()
    cursor.close()
    return count


categoies = ["computers", "fiction", "history", "science", "biography"]
page_range = [(0, 20), (20, 40)]

for cate in categoies: # loop 5
    total_count = 0
    for indexs in page_range: # loop 2
        #indexs = (0, 20)
        url = f"https://www.googleapis.com/books/v1/volumes?q=subject:{cate}&startIndex={indexs[0]}&maxResults={indexs[1]}&key={api_key}"
        resp = req.get(url)
        books = resp.json()
        items = books.get('items', [])
        print(f"category = {cate} , book size = {len(items)}")
        
        count = insert_book(items, cate, indexs) # send 20 books to extract data and insert to database
        total_count += count
        print(total_count)
conn.close()