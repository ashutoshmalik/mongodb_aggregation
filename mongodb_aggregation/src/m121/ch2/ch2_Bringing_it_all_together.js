//Problem:
//
//Calculate an average rating for each movie in our collection where English is an 
//available language, the minimum imdb.rating is at least 1, the minimum imdb.
//votes is at least 1, and it was released in 1990 or after. You'll be required to 
//rescale (or normalize) imdb.votes. The formula to rescale imdb.votes and calculate 
//normalized_rating is included as a handout.
//
//What film has the lowest normalized_rating?

var pipeline = [
    { 
        $match : { 
            "imdb.rating" : { $gte : 1 }, 
            "languages" : "English",
            "imdb.votes" : { $gte : 1},
            "year" : { $gte : 1990 }
        }        
    },
    { $addFields : {   
        "scaled_votes" : 
            { $add: 
                [ 1, 
                    { $multiply: 
                        [ 9, 
                            { $divide: 
                                [
                                    { $subtract: [ "$imdb.votes" , 5] },
                                    { $subtract: [1521105, 5] }
                                ]
                            }
                        ]
                    }
                ]
            }
        }
    },
    { $addFields : { 
        "normalized_rating" : 
                { $avg : [ "$scaled_votes", "$imdb.rating" ] } 
        } 
    },
    { 
        $sort : { "normalized_rating" : 1 } 
    },
    {
        $project : {_id : 0}
    },
    {
        $limit : 1
    }
];