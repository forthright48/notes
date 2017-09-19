# Requests

```
import requests as rq

response = rq.get(link)
txt = response.text
```

# BeautifulSoup4

```
pip install beautifulsoup4

from bs4 import BeautifulSoup as bs4

soup = BeautifulSoup(response.text, 'html.parser')

print(soup.prettify())

soup.select(css_selector)
soup.get_text()
```

## CSS Selector

```
element:nth-of-type(n)      # Get nth tag
```
