<?php
define ( 'SCOPES', implode ( ' ', array (
        \Google_Service_Gmail::GMAIL_COMPOSE 
) ) );

class GmailXOAuth2 {

    private $oauthUserEmail = '';
    private $oauthRefreshToken = '';
    private $oauthClientId = '';
    private $oauthClientSecret = '';

    public function __construct(
        $UserEmail,
        $ClientSecret,
        $ClientId,
        $RefreshToken
    ) {
        $this->oauthClientId = $ClientId;
        $this->oauthClientSecret = $ClientSecret;
        $this->oauthRefreshToken = $RefreshToken;
        $this->oauthUserEmail = $UserEmail;
    }

        /*
         * @returns $google_client object
         */
    public static function getClient() {

        $google_client = new \Google_Client ();
        $options = gmail_smtp_get_option();
        $clientId = $options['oauth_client_id'];
        $clientSecret = $options['oauth_client_secret'];
        //$google_client->setApplicationName ( APPLICATION_NAME );
        $google_client->setScopes ( 'https://mail.google.com/' );
        $google_client->setClientId($clientId);
        $google_client->setClientSecret($clientSecret);
        $redirect_url = admin_url("options-general.php?page=gmail-smtp-settings&action=oauth_grant");
        $google_client->setRedirectUri($redirect_url);
        //$google_client->setAuthConfigFile ( APP_CREDENTIALS );
                /* Its a must to request for 'offile access type' */
        $google_client->setAccessType ( 'offline' );

        return $google_client;

    }

        /*
         * checks the credentials for the access token, if present; it returns that
         * or refreshes it if expired. 
         * if the credentials file is empty, it will return the authorization url to which you must redirect too 
         * for user user authorization 
         */
    public static function authenticate () {

        $client = GmailXOAuth2::getClient();
        $options = gmail_smtp_get_option();
        if (!empty($options['oauth_access_token'])) {

            $accessToken = $options['oauth_access_token'];

        } else {

            return array( 'authorization_uri' => $client->createAuthUrl() );

        }

        $client->setAccessToken($accessToken);

        // Refresh the token if it's expired.
        if ($client->isAccessTokenExpired()) {

            $client->refreshToken($client->getRefreshToken());

            $new_accessToken = $client->getAccessToken();

            $options['oauth_access_token'] = $new_accessToken;
            
            gmail_smtp_update_option($options);
            
            return json_decode($new_accessToken, true);

        }

        return json_decode($accessToken, true);

    }

        /*
         * call this in your callback (redirect url), code the authorization for and exchanges it for an 
         * access token. 
         * it stores this in the token file for future reference.
         * if the user denies your app access, it will still return just that error and not write to the token file
         */
    public static function resetCredentials( $authCode ) {

        $client = GmailXOAuth2::getClient();

        $accessToken = $client->authenticate( $authCode );
        
        $options = gmail_smtp_get_option();
        
        if(!empty($accessToken)) {
            $options['oauth_access_token'] = $accessToken;
            gmail_smtp_update_option($options);
            return json_decode( $accessToken, true );

        }

        return false;

    }

    /**
     * GetOauth64
     * 
     * encode the user email related to this request along with the token in base64
     * this is used for authentication, in the phpmailer smtp class
     * 
     * @return string
     */
    public function getOauth64 () {

        $client = GmailXOAuth2::getClient();
        $options = gmail_smtp_get_option();
        
        if (!empty($options['oauth_access_token'])) {

            $accessToken = $options['oauth_access_token'];

        } else {

            return false;

        }

        $client->setAccessToken($accessToken);

        // Refresh the token if it's expired.
        if ($client->isAccessTokenExpired()) {

            $client->refreshToken($client->getRefreshToken());

            $accessToken = $client->getAccessToken();

            $options['oauth_access_token'] = $accessToken;
            gmail_smtp_update_option($options);

        }

        $offlineToken = GmailXOAuth2::request_offline_token();

        return base64_encode("user=" . $this->oauthUserEmail . "\001auth=Bearer " . $offlineToken . "\001\001");

    }

        /*
         * this makes a request to the Google API, using Curl to get another access token that we can use 
         * for authentication on the Gmail API when sending messages
         */
    private function request_offline_token() {

        $token_uri = "https://accounts.google.com/o/oauth2/token";
        $parameters = array(
                "grant_type" => 'refresh_token',
                "client_id" => $this->oauthClientId,
                "client_secret" => $this->oauthClientSecret,
                "refresh_token" => $this->oauthRefreshToken
        );

        $curl = curl_init($token_uri);

        curl_setopt($curl, CURLOPT_POST, true);
        curl_setopt($curl, CURLOPT_POSTFIELDS, $parameters);
        curl_setopt($curl, CURLOPT_HTTPAUTH, CURLAUTH_ANY);
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);

        $response = curl_exec($curl);
        curl_close($curl);

        $response = json_decode($response, true);

        return $response['access_token'];
    }

}
