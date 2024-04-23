//Send Through https://www.tinypng.com && https://www.videosmaller.com/ && https://www.ilovepdf.com/compress_pdf
export default {
    "logo":require("./0-Assets/logo.png"),

    "title": "Encouraging Prayer",

    "mission":"Building Confidence in Prayer",

    "goal":"Providing a platform to connect students in one on one prayer partnerships, and to send students content base on their age, gender, and walk with Christ.",

    "update":{
        "title":"Stage 101 of Development",
        "subtitle" :"Designing Partnership Matching",
        "cardPrompt": "The Progress"
    },

    //Guidelines: 600px x 600px == 1:1 ratio
    "demo":[
        {
            "name":"Mobile",
            "prompt":"See Prototype",
            "image":require("./0-Assets/demo-mobile-galaxy.png"),
            "link": "https://www.figma.com/proto/8EUrLeOWsSvU8XZc9bbJMh/Mobile-Design?node-id=1%3A2&scaling=scale-down&page-id=0%3A1&starting-point-node-id=1%3A2"
        },
        {
            "name":"Portal",
            "prompt":"See Prototype",
            "image":require("./0-Assets/demo-portal-mac.png"),
            "link": "https://www.figma.com/proto/HOGcmnYooogGDNlgAxKoSe/DASHBOARD_DESIGN?node-id=119%3A2&scaling=min-zoom&page-id=0%3A1"
        },
        {
            "name":"Video",
            "prompt":"Watch Video",
            "image":require("./0-Assets/demo-video-tablet.png"),
            "link": "https://vimeo.com/243231171?embedded=true&source=vimeo_logo&owner=74329867"
        }        
    ],

    //Guidelines: 425px x 425px == 1:1 ratio
    "cards": [
        {
            "prompt":"The Strategy",
            "image":require("./0-Assets/card-strategy.jpg"),
            "description":"Have you ever thought about how we learn? We get some teaching/coaching, we practice, and we have some accountability. The Encouraging Prayer phone app will provide a place to begin hearing and developing your prayer language.",
        },
        {
            "prompt":"The Reason",
            "image":require("./0-Assets/card-reason.jpg"),
            "description":"Therefore, confess your sins to one another and pray for one another, that you may be healed. The prayer of a righteous person is powerful and effective.",
            "footer": "James 5:16 ESV"
        },
        {
            "prompt":"The Progress",
            "image":require("./0-Assets/card-progress.jpg"),
            "description":"Our app's final touches are underway! We're integrating partnership matching and notifications, bringing us closer to completion. Stay tuned for an enhanced user experience that facilitates seamless connections and timely updates.",
            "header":"Finishing Touches:",
        }
    ],

//Guidelines: 400px H x (300pxW)
    "pages":[
        {
            "image": require("./0-Assets/1-page-left-partner.png"),
            "title":"Find a Prayer Partner",
            "description":"When you're ready to grow in your confidence in prayer, AND are willing to do the best you can to pray for your partner every day, simply click the \"find a partner\" button and you'll be paired up with someone like you who loves Jesus, is the same age, gender, and at a similar place in their relationship with Jesus."
        },
        {
            "image": require("./0-Assets/2-page-right-connect.png"),
            "title":"Connect with a Partner",
            "description":"A simple aspect of growing in any \"language\" is the commitment to practice.  Encouraging Prayer does this through these one on one partnerships, providing opportunity and accountability for daily prayer.  We have found that the number one reason Christians' aren't confident in their prayer is because - they don't pray!"
        },
        {
            "image": require("./0-Assets/3-page-left-messaging.png"),
            "title":"Realtime Messaging",
            "description":"Most of us live life in a rush, not cool, but real.  Encouraging Prayer allows you to pray for your partner, hit the \"I Prayed\" button, and then notifies your partner \"Your partner prayed for you.\"  Also, as your confidence in prayer increases and your relationship with your partner develop, you can also send & receive specific and meaningful prayers via realtime messaging."
        },
        {
            "image": require("./0-Assets/4-page-right-requests.png"),
            "title":"Share Prayer Requests",
            "description":"You can share your prayer request with your one on one partner, a friend on Encouraging Prayer, your youth group circle, or all of them!"
        },
        {
            "image": require("./0-Assets/5-page-left-events.png"),
            "title":"Discover Events",
            "description":"Partner churches & ministries will share their events near you.  Search and find opportunities to Pray, Encourage, and Worship with other students near you."
        },
        {
            "image": require("./0-Assets/6-page-right-curated.png"),
            "title":"Curated Christian Teachings",
            "description":"Great news - there are thousands of biblically sound teachings out there for you.  The bummer is sorting it all out.  Encouraging Prayer helps by using your registration criteria to suggest teachings, and then refining those suggestions based on your viewing."
        },
        {
            "image": require("./0-Assets/page-portal-mac.png"),
            "title":"Youth Leader Portal",
            "description":"Send reminders, prayer requests, encouragement to some or all of your youth group, and get real insights on how much your students are praying, seeking content, and engaging in your events."
        }
    ],


    "feedback": {

        "title":"Feedback",

        "cors-proxy":"https://cors-anywhere.herokuapp.com/",   //TODO: Temporary Proxy

        "google-form":"https://docs.google.com/forms/d/10htIlpcVD-EsQZtjTq8nzCpQXORVjZKxsZJrluyWqxw/",

        "submit-success":"Thank you for your feedback!",

        "submit-fail":"Unfortunately, we failed to save your feedback.  Not to worry, we will redirect you to Google Forms in: ",

        "submit-fail-directions":"We are importing all your greatly appreciated feedback.  Please simply click 'SUBMIT' at the bottom.",

        "name-formID":"entry.1649737574",

        "email-formID":"entry.1864498328",

        "prayer-formID":"entry.1669233170",
        "prayer-prompt":"How can our team pray for you today?",
        
        "general":[
            {
                "formID":"entry.652543099",
                "type":"option",
                "prompt":"What is the most important feature?",
                "options":[
                    "Prayer Partners",
                    "Circle Groups",
                    "Event Posting",
                    "Curated Content"
                ]
            },
            {
                "formID":"entry.704561069",
                "type":"field",
                "prompt":"Any ideas for new features?",
            }  ,
            {
                "formID":"entry.1986831274",
                "type":"paragraph",
                "prompt":"What are your thoughts on the Encouraging Prayer App?",
            }                      
        ],

        "role-formID":"entry.1028101260",

        "roles":[
            {
                "name":"Student",
                "questions":[
                    {
                        "formID":"entry.1747772692",
                        "type":"option",
                        "prompt":"Would you be willing to give monthly feedback as the app is developed?",
                        "options":[
                            "No",
                            "Yes",
                        ]
                    },
                    {
                        "formID":"entry.1978563427",
                        "type":"option",
                        "prompt":"Would you be interested in multiple Prayer Partners?",
                        "options":[
                            "No",
                            "Yes",
                        ]
                    },
                    {
                        "formID":"entry.2122381404",
                        "type":"option",
                        "prompt":"Would you be interested in a small prayer group of 3-5?",
                        "options":[
                            "No",
                            "Yes",
                        ]
                    }
                ]
            },
            {
                "name":"Leader",
                "questions":[
                    {
                        "formID":"entry.1019493683",
                        "type":"option",
                        "prompt":"Would you be willing to give monthly feedback as the app is developed?",
                        "options":[
                            "No",
                            "Yes",
                        ]
                    },
                    {
                        "formID":"entry.753053082",
                        "type":"option",
                        "prompt":"Do you have a group of students that would be willing to try our beta release and provide input?",
                        "options":[
                            "No",
                            "Yes",
                        ]
                    },
                    {
                        "formID":"entry.1457994900",
                        "type":"drop",
                        "prompt":"Roughly how many students attend your group?",
                        "options":[
                            "Less than 15 Students",
                            "15-30 Students",
                            "30-50 Students",
                            "More than 50 Students"
                        ]
                    },
                    {
                        "formID":"entry.1249044806",
                        "type":"paragraph",
                        "prompt":"Is there anything that would keep you from promoting this App with your students?",
                        "options":[
                            "No",
                            "Yes",
                        ]
                    }
                ]
            },
            {
                "name":"Financial Supporter",
                "questions":[
                    {
                        "formID":"entry.1742886000",
                        "type":"option",
                        "prompt":"Every gift is important to this project, and we believe the key to making it work long-term is to have ongoing monthly support.  Would you be willing to make a monthly gift?",
                        "options":[
                            "No",
                            "Yes",
                        ]
                    },
                    {
                        "formID":"entry.644069819",
                        "type":"option",
                        "prompt":"PEW35 is also building an endowment fund to assure the future work of the ministry.  Gifts of $50,000 or more will be considered for this fund.  Can we send you more information?",
                        "options":[
                            "No",
                            "Yes",
                        ]
                    }
                ]
            },
            {
                "name":"Techno Wizard",
                "questions":[
                    {
                        "formID":"entry.6177422",
                        "type":"option",
                        "prompt":"Are you interested in helping our team?",
                        "options":[
                            "Join Development Team",
                            "Source of technical advice",
                            "Demo Alpha version"
                        ]
                    },
                    {
                        "formID":"entry.1037757956",
                        "type":"select",
                        "prompt":"Do you have an area of expertise?",
                        "options":[
                            "UI Design",
                            "App Design",
                            "Web Design",
                            "Server/Database Design",
                            "Devops / AWS",
                            "Business Management",
                            "App Marketing"
                        ]
                    },
                    {
                        "formID":"entry.976720631",
                        "type":"select",
                        "prompt":"Are you familiar with these technologies?",
                        "options":[
                            "Deploying to App Stores",
                            "Deploying to AWS",
                            "AWS serverless",
                            "Postgres SQL",
                            "Socket.IO",
                        ]
                    },
                    {
                        "formID":"entry.999904264",
                        "type":"drop",
                        "prompt":"How much might you be available in the next 6 months?",
                        "options":[
                            "1-3 Hours / Month",
                            "1-2 Hours / Week",
                            "3-5 Hours / Week"
                        ]
                    },
                    {
                        "formID":"entry.392992440",
                        "type":"paragraph",
                        "prompt":"Do you have advice for security and scalability?",
                    },
                    {
                        "formID":"entry.1967801108",
                        "type":"paragraph",
                        "prompt":"Are we on the right track?",
                    }
                ]
            }
        ]
    },

    "subscription":{
        "title":"Subscribe for Updates",
        
        "email-formID":"email",

        "questions":[
            {
                "formID":"role",
                "type":"option",
                "prompt":"Which role fits you?",
                "options":[
                    "User",
                    "Leader",
                    "Financial Supporter"
                ]
            },
            {
                "formID":"note",
                "type":"paragraph",
                "prompt":"How can our team pray for you today?",
            }
        ]
    },

    "technical":[
        {
            "name":"Mobile App Outline",
            "file": require("./0-Assets/uml-mobile.pdf"),
        },
        {
            "name":"Management Portal Outline",
            "file": require("./0-Assets/uml-portal.pdf"),
        },
        {
            "name":"Server Outline",
            "file": require("./0-Assets/uml-server.pdf"),
        }
    ],

    "information": {
        "title": "Our Ministry",
        "references": [
            {
                "name":"Day of Prayer",
                "link":"https://pew35.org/dayofprayer"
            },
            {
                "name":"Mission Statement",
                "link":"https://pew35.org/mission"
            },
            {
                "name":"Vision Statement",
                "link":"https://pew35.org/vision"
            },
            {
                "name":"Doctrinal Statement",
                "link":"https://pew35.org/doctrinal"
            },
            {
                "name":"About Pew35",
                "link":"https://pew35.org/about"
            },
            {
                "name":"FAQs",
                "link":"https://pew35.org/faq"
            }
        ]
    }
}