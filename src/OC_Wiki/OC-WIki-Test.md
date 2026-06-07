---
layout: layout/wiki.njk
title: Test
description: testing
permalink: /OC-Wiki/test.html
image: /images/favicon.ico
property1: 
    nested-property: hello!
---
# HELP

Adding Content
{{ property1.nested-property }}


## What it's supposed to look like
- left side bar
    - home button
    - navigation
- each world has some characters

## Properties to use:
- Name
- Nicknames/ Aliases
- Pronouns
- Species
- Birthday
- Age 

## Notes
use nested properties to display sub species etc.

![Alt Text]({{ image }}) <- display an image from properties

use float in CSS to make the side thingy https://www.w3schools.com/Css/css_float.asp

## Contents
### {{ Title }}
Table of Contents

Basic Description

<hr>

#### Biography
##### Story Event 1

<hr>

#### Notes
- blah
- blah

<hr>

#### Trivia
- blah
- blah

<hr>

#### Gallery

<ul>
    {% for item in changelog %}
      <li><strong>{{ item.date }}:</strong> {{ item.text }}</li>
    {% endfor %}
</ul>



help 
help


