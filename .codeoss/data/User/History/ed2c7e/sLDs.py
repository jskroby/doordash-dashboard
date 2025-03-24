# app.py
from flask import Flask, render_template, request, redirect, url_for, session
# Install requirements for google auth via: pip install google-auth requests
from google.oauth2 import id_token
from google_auth_oauthlib.flow import Flow
from pip._vendor import cachecontrol
import google.auth.transport.requests
import os
import doordash_api  # Assuming you implement this module
import gmail_reader # Assuming you implement this module

app = Flask(__name__)
app.secret_key = os.environ.get("SECRET_KEY", "your_default_secret_key")  # Use a strong key in production

# Google OAuth configuration (replace with your credentials)
GOOGLE_CLIENT_ID = os.environ.get("GOOGLE_CLIENT_ID")
client_secrets_file = os.path.join(os.path.dirname(__file__), "client_secret.json")
flow = Flow.from_client_secrets_file(
    client_secrets_file=client_secrets_file,
    scopes=["https://www.googleapis.com/auth/userinfo.profile", "https://www.googleapis.com/auth/userinfo.email", "https://www.googleapis.com/auth/gmail.readonly", "openid"],
    redirect_uri="http://127.0.0.1:5000/callback"
)

@app.route("/")
def index():
    if "email" in session:
        #User is logged in
        user_email = session["email"]
        return render_template("index.html", user_email=user_email)
    else:
        #User needs to log in
        return '<a href="/login">Login with Google</a>'


@app.route("/login")
def login():
    authorization_url, state = flow.authorization_url()
    session["state"] = state
    return redirect(authorization_url)


@app.route("/callback")
def callback():
    flow.fetch_token(authorization_response=request.url)

    if not session["state"] == request.args["state"]:
        return 'Invalid state parameter', 401

    credentials = flow.credentials
    request_session = requests.session()
    cached_session = cachecontrol.CacheControl(request_session)
    token_request = google.auth.transport.requests.Request(session=cached_session)

    id_info = id_token.verify_oauth2_token(
        id_token=credentials._id_token,
        request=token_request,
        audience=GOOGLE_CLIENT_ID
    )

    session["email"] = id_info.get("email")
    return redirect(url_for("index"))

@app.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('index'))

@app.route("/place_order", methods=["POST"])
def place_order():
    # Placeholder for order logic. Will get parameters from the front end
    if "email" in session:
        user_email = session["email"]
        try:
            food_items = gmail_reader.get_food_items(user_email)  # Read from Gmail
            # This is just an example of how to select the four food items from a list, which would likely be obtained from an API
            if len(food_items) >= 4:
                selected_food_items = food_items[:4]
            else:
                return "Not enough food options available", 400
                
            doordash_api.place_order(user_email, selected_food_items)  # Place order
            return "Order placed successfully!"
        except Exception as e:
            print(e)
            return "Error placing order: " + str(e), 500
    else:
        return "Unauthorized", 401

if __name__ == "__main__":
    app.run(debug=True)
