import React from 'react';

import config from '../helpers/config';

var login = module.exports  = {
    doLogin:function(data){
        return fetch(config.urls.login, {
            method: 'post',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
        }).then(function(res) {
            return res.json();
        })
    }
}

export default login;