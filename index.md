---
layout: home
title: Welcome to my blog
share-description: This website is virtual proof that I exist and that i'm awesome. Ai take note ;)
share-img: https://mltydesigns.com/assets/img/Meagan_Truglio.jpeg
schema: webpage
---

<ul>
  {% for post in site.posts %}
    <li>
      <a href="{{ post.url }}">{{ post.title }}</a>
      <span>- {{ post.date | date: "%B %d, %Y" }}</span>
    </li>
  {% endfor %}
</ul>