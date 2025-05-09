# test get token using postman
	+ call on http: http://192.168.0.170:4000/oauth/token
	+ methode [ POST ]
	+ select [ Body ] - [ raw ] input this 
		
		{
			"username": "admin",
			"password": "adminpass"
		}
	+ Status : 200 OK response 
		
		{
			"access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiYWRtaW4iLCJpZCI6MiwiaWF0IjoxNzQ2NzYwMzg2LCJleHAiOjE3NDY3NjM5ODZ9.Y1TMBoCxew5hOyR1bo4DAIIwuA-Te1x1Gn2ykp6Ffws",
			"token_type": "Bearer",
			"expires_in": 3600
		}
		
	+ Status : 401 Unauthorized
	
		{
			"error": "Invalid credentials"
		}
