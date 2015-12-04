<?php
namespace DribbbleFolio;

class Dribbble
{
    const ENDPOINT_SHOTS      = '/shots';
    const ENDPOINT_USERS      = '/users';
    const TIMEOUT_DEFAULT_SEC = 30;

    protected $_apiRoot      = 'https://api.dribbble.com/v1';
    protected $_token;

    public function __construct($token)
    {
        $this->_token = $token;
    }

    public function getUserShots($username, $counter)
    {
        $endpoint = $this->_apiRoot . self::ENDPOINT_USERS . '/' . $username . self::ENDPOINT_SHOTS . '?access_token=' . $this->_token . '&per_page=' . $counter;

        return $this->_executeRequest($endpoint);
    }

    protected function _executeRequest($url)
    {
        $userAgent = "Dribbble API/PHP (App {$this->_token})";

        $ch = curl_init();

        curl_setopt(
            $ch, CURLOPT_HTTPHEADER, array(
                'Accept: application/json', 'Content-Type: multipart/form-data', 'Expect:'
            )
        );
        curl_setopt($ch, CURLOPT_TIMEOUT, self::TIMEOUT_DEFAULT_SEC);
        curl_setopt($ch, CURLOPT_USERAGENT, $userAgent);
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_BINARYTRANSFER, 1);
        curl_setopt($ch, CURLOPT_HEADER, 0);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
        curl_setopt($ch, CURLOPT_HTTPGET, 1);

        $response = curl_exec($ch);
        return $response;

        curl_close($ch);
    }
}
