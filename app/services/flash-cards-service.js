import React from 'react';

import config from '../helpers/config';

var flashCards = module.exports  = {
    getFlashCard: function(data){
        let flash_url = config.urls.flash_cards + "?part="+ data.part;
        flash_url += '&page=' + data.page + '&per_page='+data.per_page + '&offset='+data.offset;
        flash_url += '&access_token='+ data.access_token;
        return fetch(flash_url, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function(res) {
            return res.json();
        })
    },
    getFlashCardAnswer: function(data){
        let flash_url = config.urls.flash_cards_answer + "?id="+ data.id;
        flash_url += '&access_token='+ data.access_token;
        return fetch(flash_url, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function(res) {
            return res.json();
        })
    }
}

export default flashCards;