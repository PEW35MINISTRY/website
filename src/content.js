//Send Through https://www.tinypng.com && https://www.videosmaller.com/ && https://www.ilovepdf.com/compress_pdf
export default {
    "logo":require("./0-Assets/logo.png"),

    "title": "Encouraging Prayer",

    "mission":"Building Confidence in Prayer",

    "goal":"Providing a platform to connect students in one on one prayer partnerships, and to send students content base on their age, gender, and walk with Christ.",

    "update":{
        "title":"Stage 1 of Development",
        "subtitle" :"Expected release: Spring 2023",
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
            "description":"We are just getting started laying out the foundational designs and recruiting a team of talented individuals for this great venture.",
            "header":"Stage 1 of Development:",
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
        "prayer-prompt":"How can our team pray for you today?",

        "general":[
            {
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
                "type":"field",
                "prompt":"Any ideas for new features?",
            }  ,
            {
                "type":"paragraph",
                "prompt":"What are your thoughts on the Encouraging Prayer App?",
            }                      
        ],

        "groups":[
            {
                "name":"Student",
                "questions":[
                    {
                        "type":"option",
                        "prompt":"Would you be willing to give monthly feedback as the app is developed?",
                        "options":[
                            "No",
                            "Yes",
                        ]
                    },
                    {
                        "type":"option",
                        "prompt":"Would you be interested in multiple Prayer Partners?",
                        "options":[
                            "No",
                            "Yes",
                        ]
                    },
                    {
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
                        "type":"option",
                        "prompt":"Would you be willing to give monthly feedback as the app is developed?",
                        "options":[
                            "No",
                            "Yes",
                        ]
                    },
                    {
                        "type":"option",
                        "prompt":"Do you have a group of students that would be willing to try our beta release and provide input?",
                        "options":[
                            "No",
                            "Yes",
                        ]
                    },
                    {
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
                        "type":"option",
                        "prompt":"Every gift is important to this project, and we believe the key to making it work long-term is to have ongoing monthly support.  Would you be willing to make a monthly gift?",
                        "options":[
                            "No",
                            "Yes",
                        ]
                    },
                    {
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
                        "type":"option",
                        "prompt":"Are you interested in helping our team?",
                        "options":[
                            "Join Development Team",
                            "Source of technical advice",
                            "Demo Alpha version"
                        ]
                    },
                    {
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
                        "type":"drop",
                        "prompt":"How much might you be available in the next 6 months?",
                        "options":[
                            "1-3 Hours / Month",
                            "1-2 Hours / Week",
                            "3-5 Hours / Week"
                        ]
                    },
                    {
                        "type":"paragraph",
                        "prompt":"Do you have advice for security and scalability?",
                    },
                    {
                        "type":"paragraph",
                        "prompt":"Are we on the right track?",
                    }
                ]
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