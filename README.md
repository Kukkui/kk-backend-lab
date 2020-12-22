<b>SERTIS BACKEND LAB</b>
<br/><br/>
**TODOS...**
1. npm i --save<br/>
2. npm start <br/>

| URL | METHOD | REQ-BODY | EVENTS |
| ------ | --- | ------ | ------------ |
| localhost:5000/ | GET | - | Create table/database and set sessions|
| localhost:5000/auth | POST | username<br/>password | check for account authentication, old account check password, new account randomly generated password | 
| localhost:5000/posts/all  | GET | - | list all post from anyone with JSON output. Fetch from mysql online instead of local mysql| 
| localhost:5000/posts/me | GET | - | list all posts that own by current authenticated user |
| localhost:5000/posts/new | POST | content<br/>cardName<br/>cardstatus<br/>cardContent<br/>cardCategory | Add new post(with title/status/category/name/etc) and record the owner rights | 
| localhost:5000/posts/edit[:id] | PUT | content<br/>cardName<br/>cardstatus<br/>cardContent<br/>cardCategory | Update the post that own by the current authenticted user |
| localhost:5000/posts/delete/[:id] | DELETE | - | Delete content own by the authenticated user | 
<hr/>

<hr/><br/>

<br/>
<img src="./screenshots/index.gif" width="100%" /><br/>
<b>GET localhost:5000 <= {} </b><br/><br/>
<hr/><br/>
<img src="./screenshots/auth.gif" width="100%" /><br/>
<b>POST localhost:5000/auth  <= {username,password} </b><br/><br/>
<hr/><br/>
<img src="./screenshots/allpost.gif" width="100%" /><br/>
<b>GET localhost:5000/posts/all <= {} </b><br/><br/>
<hr/><br/>
<img src="./screenshots/mypost.gif" width="100%" /><br/>
<b>GET localhost:5000/posts/me <= {} </b><br/><br/>
<hr/><br/>
<img src="./screenshots/addpost.gif" width="100%" /><br/>
<b>POST localhost:5000/posts/new <= {content,cardName,cardstatus,cardContent,cardCategory} </b><br/><br/>
<hr/><br/>
<img src="./screenshots/edit.gif" width="100%" /><br/>
<b>PUT localhost:5000/posts/edit/[:id] <= {content,cardName,cardstatus,cardContent,cardCategory} </b><br/><br/>
<hr/><br/>
<img src="./screenshots/del.gif" width="100%" /><br/>
<b>DELTE localhost:5000/posts/delete/[:id] <= {} </b><br/><br/>
<hr/><br/>

# kk-sertis-lab-backend-v2
