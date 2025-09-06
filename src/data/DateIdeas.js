const places = [
  {
    name: "Provo Farmers Market",
    mapSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3045.9467147884125!2d-111.6712989236048!3d40.23248696683182!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x874d99ffbc44fe4f%3A0xf80b7a7a8af35062!2sProvo%20Farmers%20Market!5e0!3m2!1sen!2sus!4v1726350046948!5m2!1sen!2sus",
    imgSrc: `${process.env.PUBLIC_URL}/images/date_ideas/farmers_market.png`,
    website: "http://www.provofarmersmarket.com/",
    rating: "★★★★★",
    pricing: "$0-$30/person",
    free: false,
    hours: "Saturday 9AM-2PM",
    categories: ["Outdoors", "Shopping"],
    description:
      "Great for buying fresh produce and spending time with a girl!",
    minDateNumber: 1,
    distanceFromCampus: 3,
    timeOfDay: ["morning", "afternoon"],
    seasonalTimeframe: {
      months: ["June", "July", "August", "September", "October"],
    },
  },
  {
    name: "Pickleball",
    imgSrc: `${process.env.PUBLIC_URL}/images/date_ideas/pickleball.png`,
    description:
      "Pickleball is a great way to spend time with a girl! It allows for exercise but it's easy enough to keep a conversation going too!",
    minDateNumber: 0,
    free: true,
    categories: ["Outdoors", "Recreation", "Sports"],
    locations: [
      {
        name: "Rotary Park",
        src: "https://maps.app.goo.gl/xP4Y9eaGmFHBozMv7",
        distanceFromCampus: 2,
      },
      {
        name: "Kiwanis Park Tennis Courts",
        src: "https://maps.app.goo.gl/1LmnH1zszKEH137p8",
        distanceFromCampus: 0.5,
      },
    ],
    timeOfDay: ["morning", "afternoon", "evening"],
    seasonalTimeframe: {
      months: [
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
      ],
    },
  },
  {
    name: "Go for a Walk or Hike",
    imgSrc: `${process.env.PUBLIC_URL}/images/date_ideas/walk_or_hike.png`,
    minDateNumber: 0,
    description:
      "Going for a walk is a great first date idea. It allows you to get to know another person while you enjoy nature!",
    locations: [
      {
        name: "Provo River Walk",
        src: "https://maps.app.goo.gl/PV5H1gpabcbpGDbeA",
        distanceFromCampus: 3,
      },
      {
        name: "Lakeshore Bridge Trailhead",
        src: "https://maps.app.goo.gl/XmaKap2qKnrDyw7x6",
        distanceFromCampus: 4,
      },
      {
        name: "The Y Hike",
        src: "https://www.hikethey.com/hike-the-y-trail/",
        distanceFromCampus: 1.5,
      },
    ],
    free: true,
    categories: ["Outdoors"],
    timeOfDay: ["morning", "afternoon", "evening"],
    seasonalTimeframe: {
      months: [
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
      ],
    },
  },
  {
    name: "Cook some food!",
    imgSrc: `${process.env.PUBLIC_URL}/images/date_ideas/cook.png`,
    minDateNumber: 0,
    categories: ["Cooking", "Food"],
    description:
      "All girls love when a man cooks for them! It's a great way to eat together without paying lots of money, and cooking WITH a girl can help you to get to know each other better too!",
    link: {
      text: "Click here for some recipe ideas!",
      url: "/recipes",
    },
    pricing: "$0-$20",
    majorRizz: true,
    timeOfDay: ["afternoon", "evening", "night"],
    seasonalTimeframe: {
      months: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
    },
  },
  {
    name: "Skating",
    pricing: "$10-$15/person",
    majorRizz: true,
    imgSrc: `${process.env.PUBLIC_URL}/images/date_ideas/ice_skating.png`,
    minDateNumber: 0,
    categories: ["Recreation", "Sports"],
    description:
      "Skating is a great way to get to know a girl and learn a new skill!",
    locations: [
      {
        name: "Peaks Ice Arena",
        src: "https://www.provo.org/community/peaks-ice-arena",
        distanceFromCampus: 1,
      },
      {
        name: "Classic Skating",
        src: "https://classicfun.com/",
        distanceFromCampus: 4,
      },
    ],
    timeOfDay: ["afternoon", "evening", "night"],
    seasonalTimeframe: {
      months: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
    },
  },
  {
    name: "Downtown Provo Events",
    description:
      "Living in Provo, you can find lots of events happening closeby! Many are free or very cheap and allow you to spend quality time with a girl.",
    imgSrc:
      "https://s3.us-east-1.amazonaws.com/bt-prod-img/place/Provo-Utah.jpg",
    minDateNumber: 1,
    categories: ["Recreation"],
    website:
      "https://www.provo.org/community/covey-center-for-the-arts/what-s-happening/events",
    distanceFromCampus: 1,
    timeOfDay: ["afternoon", "evening", "night"],
    seasonalTimeframe: {
      months: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
    },
  },
  {
    name: "Carve Pumpkins!",
    months: ["October"],
    description:
      "Carving pumpkins is great for being creative and also spending time with a girl!",
    minDateNumber: 0,
    categories: ["Cooking", "Recreation"],
    pricing: "$10-$20",
    imgSrc:
      "https://img.freepik.com/premium-photo/serious-young-multiethnic-couple-sitting-table-preparing-pumpkins-carving_622301-3359.jpg",
    timeOfDay: ["afternoon", "evening"],
    seasonalTimeframe: {
      months: ["October"],
    },
  },
  {
    name: "Rock Climbing",
    description:
      "Try indoor rock climbing or head outdoors for a more challenging experience. Test your strength and problem-solving skills together.",
    minDateNumber: 1,
    categories: ["Sports", "Outdoors"],
    pricing: "$20 - $50",
    imgSrc:
      "https://www.health.com/thmb/9SaajPUAjKpnlhdOQdrSalgO_9k=/2121x0/filters:no_upscale():max_bytes(150000):strip_icc()/RockClimbing-c7d67bffc2e44e9d836e7263eb52555c.jpg",
    locations: [
      {
        name: "The Quarry",
        src: "https://quarryclimbing.com/",
        distanceFromCampus: 1,
      },
      {
        name: "The Kitchen",
        src: "https://www.mountainproject.com/area/105739712/the-kitchen",
        distanceFromCampus: 2.5,
      },
    ],
    majorRizz: false,
    timeOfDay: ["morning", "afternoon", "evening"],
    seasonalTimeframe: {
      months: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
    },
  },
  {
    name: "Go-Kart Racing",
    description:
      "Race each other in go-karts on a nearby track. Compete for the fastest lap times while having a blast.",
    minDateNumber: 0,
    categories: ["Sports", "Recreation"],
    pricing: "$20 - $30",
    imgSrc:
      "https://www.k1speed.com/wp-content/uploads/2018/09/couple-racing-1024x683.jpg",
    locations: [
      {
        name: "Redline Racing",
        src: "https://redlineracingusa.com/",
        distanceFromCampus: 8,
      },
      {
        name: "The Grid Racing",
        src: "https://thegrid.com/",
        distanceFromCampus: 11,
      },
    ],
    majorRizz: false,
    timeOfDay: ["afternoon", "evening", "night"],
    seasonalTimeframe: {
      months: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
    },
  },
  {
    name: "Shopping Trip",
    description:
      "Spend the day browsing through a local mall or shopping district, picking out new clothes or gadgets, and having fun together.",
    minDateNumber: 0,
    categories: ["Shopping", "Recreation"],
    pricing: "$0 - $100",
    imgSrc:
      "https://media.istockphoto.com/id/1369227756/photo/giggling-their-way-through-the-mall.jpg?s=612x612&w=0&k=20&c=QCk2FJg1m0bTFCOAvspDbCnM1p-NMMM7qdnPJXCwqH4=",
    locations: [
      {
        name: "Provo Town Center",
        src: "https://www.provotownecentre.com/",
        distanceFromCampus: 3,
      },
      {
        name: "University Place",
        src: "https://universityplaceorem.com/?utm_source=GMB&utm_medium=organic&utm_campaign=1SEO_SM",
        distanceFromCampus: 2,
      },
      {
        name: "IKEA",
        src: "https://www.ikea.com/us/en/stores/draper/",
        distanceFromCampus: 28,
      },
    ],
    timeOfDay: ["morning", "afternoon", "evening"],
    seasonalTimeframe: {
      months: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
    },
  },
  {
    name: "Museum Visit",
    description:
      "Explore a nearby museum to learn about art, history, or science. Spend the day discovering exhibits and engage in discussions.",
    minDateNumber: 0,
    categories: ["Learning", "Recreation"],
    pricing: "Free",
    free: true,
    imgSrc:
      "https://cdn.britannica.com/51/194651-050-747F0C18/Interior-National-Gallery-of-Art-Washington-DC.jpg",
    locations: [
      {
        name: "BYU Museum of Paleontology",
        src: "https://geology.byu.edu/museum-of-paleontology",
        distanceFromCampus: 0.5,
      },
      {
        name: "Bean Life Science Museum",
        src: "https://lsm.byu.edu/",
        distanceFromCampus: -1,
      },
      {
        name: "Museum of Mormon Mexican History",
        src: "https://museumofmormonmexicanhistory.com/",
        distanceFromCampus: 0.25,
      },
      {
        name: "Museum of Ancient Life",
        src: "https://thanksgivingpoint.org/attractions-tickets/museum-of-ancient-life/",
        distanceFromCampus: 20,
      },
      {
        name: "BYU Museum of Art",
        src: "http://moa.byu.edu/",
        distanceFromCampus: -1,
      },
      {
        name: "BYU Museum of Peoples and Cultures",
        src: "http://mpc.byu.edu/",
        distanceFromCampus: -1,
      },
      {
        name: "Education in Zion in the JFSB",
        src: "https://educationinzion.byu.edu/",
        distanceFromCampus: -1,
      },
    ],
    majorRizz: false,
    timeOfDay: ["morning", "afternoon", "evening"],
    seasonalTimeframe: {
      months: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
    },
  },
  {
    name: "Outdoor Picnic",
    description:
      "Enjoy a relaxing picnic at the local park with a blanket, snacks, and good company. You can bring your own food or grab something from a nearby café.",
    minDateNumber: 0,
    categories: ["Food", "Outdoors", "Recreation"],
    pricing: "Free to $20",
    imgSrc:
      "https://assets.simpleviewinc.com/simpleview/image/upload/c_fill,h_900,q_75,w_1200/v1/clients/utahvalley/Picnictable_45577c44-ac66-4e51-a1c1-7282b080f301.jpg",
    locations: [
      {
        name: "Nielsen's Grove Park",
        src: "https://orem.org/nielsens-grove-park/",
        distanceFromCampus: 3.5,
      },
      {
        name: "Bridal Veil Picnic Area",
        src: "https://g.co/kgs/M1pt4hX",
        distanceFromCampus: 7.5,
      },
    ],
    majorRizz: false,
    timeOfDay: ["morning", "afternoon", "evening"],
    seasonalTimeframe: {
      months: [
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
      ],
    },
  },
  {
    name: "Top Golf",
    description: "Great fun for a small price!",
    pricing: "$30/person",
    imgSrc:
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/04/cc/08/8e/topgolf-the-colony.jpg?w=900&h=500&s=1",
    minDateNumber: 1,
    categories: ["Recreation"],
    website: "https://topgolf.com/us/vineyard/",
    distanceFromCampus: 7,
    timeOfDay: ["afternoon", "evening", "night"],
    seasonalTimeframe: {
      months: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
    },
  },
]

export default places
