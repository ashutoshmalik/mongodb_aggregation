//Problem:
//
//  Help MongoDB pick a movie our next movie night! Based on employee polling, we've decided 
//  that potential movies must meet the following criteria.
//
//  imdb.rating is at least 7
//  genres does not contain "Crime" or "Horror"
//  rated is either "PG" or "G"
//  languages contains "English" and "Japanese"

var pipeline = [
    { $match : 
        { $and : 
            [
                { "imdb.rating" : { $gte : 7 }}, 
                { "genres" :{ $nin :[ "Crime", "Horror" ]}},
                { "rated" : { $in : [ "PG", "G" ]}},
                { "languages" : { $all : [ "English", "Japanese" ]}}
            ]
        }
    }
];