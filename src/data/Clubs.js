const clubs = [
  {
    name: "A Cappella Club",
    description:
      "Join our vibrant a cappella community where students come together to create beautiful harmonies and perform amazing vocal arrangements without instruments.",
    baddyProbability: 0.7,
    url: "https://clubs.byu.edu/link/Clubs/BYUAC3",
    image: "/images/clubs/a_cappella_club.png",
    cost: "Free",
    time: "Tuesdays 7:00 PM - 8:00 PM",
  },
  {
    name: "Exercise Clubs",
    description:
      "Stay physically active while building meaningful friendships through various exercise activities including gymnastics, pickleball, and yoga sessions designed for all skill levels.",
    baddyProbability: 0.79,
    cost: "Varies",
    image: "/images/clubs/exercise_club.png",
    subClubs: [
      {
        name: "Gymnastics",
        url: "https://clubs.byu.edu/link/Clubs/Gymnastics",
      },
      {
        name: "Pickleball",
        url: "https://clubs.byu.edu/link/Clubs/BYUPC2",
      },
      {
        name: "Yoga",
        url: "https://clubs.byu.edu/link/Clubs/Downwardcougar",
      },
    ],
  },
  {
    name: "Baking Club",
    description:
      "Discover the art of baking delicious treats while connecting with fellow students who share your passion for creating amazing desserts and sweet treats together.",
    baddyProbability: 0.8,
    url: "https://clubs.byu.edu/link/Clubs/BBC",
    image: "/images/clubs/baking_club.png",
    cost: "Free",
    time: "2nd and 4th Tuesday of each month 6:45 PM - 7:45 PM",
  },
  {
    name: "Come Follow Me Club",
    description:
      "Join fellow students in meaningful gospel study sessions where you can deepen your understanding of Come Follow Me lessons while building lasting friendships and spiritual connections.",
    baddyProbability: 0.68,
    url: "https://clubs.byu.edu/link/Clubs/CFMC",
    image: "/images/clubs/come_follow_me_club.png",
    cost: "Free",
    time: "Thursdays 7:00 PM",
  },
  // {
  //   name: "Country Swing Dance Club",
  //   image: "https://i.ytimg.com/vi/M3w8mlBo4nk/maxresdefault.jpg",
  //   description:
  //     "Learn how to Swing Dance! There are always lots of girls wanting a dance partner!",
  //   baddyProbability: 0.9,
  //   url: "https://clubs.byu.edu/link/Clubs/CSD",
  //   time: "Tuesdays 7:00 PM - 8:30 PM",
  //   cost: "$5/semester",
  // },
  {
    name: "Dancing Clubs",
    image: "/images/clubs/dancing_club.png",
    description:
      "Explore the world of dance through various styles including country swing, international folk, Irish, social, salsa, and tap dancing with welcoming communities for all skill levels.",
    baddyProbability: 0.95,
    cost: "Varies",
    subClubs: [
      {
        name: "Country Swing Dance",
        url: "https://clubs.byu.edu/link/Clubs/CSD",
      },
      {
        name: "International Folk Dance",
        url: "https://clubs.byu.edu/link/Clubs/IFDC",
      },
      {
        name: "Irish Dance",
        url: "https://clubs.byu.edu/link/Clubs/IDC",
      },
      {
        name: "Social Dance",
        url: "https://clubs.byu.edu/link/Clubs/BYU-SDC",
      },
      {
        name: "Salsa Dance",
        url: "https://clubs.byu.edu/link/Clubs/BYU-Salsa-Club",
      },
      {
        name: "Tap Dance",
        url: "https://clubs.byu.edu/link/Clubs/Tap-Association",
      },
    ],
  },
  {
    name: "Disney Club",
    description:
      "Immerse yourself in the magical world of Disney through themed activities, movie nights, character discussions, and creative projects that bring the Disney magic to BYU campus life.",
    baddyProbability: 0.82,
    url: "https://clubs.byu.edu/link/Clubs/DC2",
    image: "/images/clubs/disney_club.png",
    cost: "Free",
    time: "Tuesday 7:00 PM - 8:30 PM",
  },
  {
    name: "Divine Comedy",
    description:
      "Join BYU's premier comedy group where you can develop your comedic talents, perform in family-friendly shows, and bring laughter to the campus community through clean humor.",
    baddyProbability: 0.73,
    url: "https://clubs.byu.edu/link/Clubs/DC",
    image: "/images/clubs/divine_comedy.png",
    cost: "Free",
    requestToJoin: true,
  },
  {
    name: "English Society",
    description:
      "Connect with fellow literature enthusiasts and English majors through engaging discussions, creative writing workshops, and academic events that celebrate the beauty and power of language and literature.",
    baddyProbability: 0.8,
    url: "https://clubs.byu.edu/link/Clubs/ES",
    image: "/images/clubs/english_society.png",
    cost: "Free",
    requestToJoin: true,
  },
  {
    name: "Family History Association",
    description:
      "Discover your family's unique story through genealogy research, temple work coordination, and meaningful connections with ancestors while building relationships with others passionate about family history work.",
    baddyProbability: 0.77,
    url: "https://clubs.byu.edu/link/Clubs/Family-History-Association",
    image: "/images/clubs/family_history_club.png",
    cost: "Free",
  },
  {
    name: "Food Science Association",
    description:
      "Explore the fascinating world of food science through hands-on experiments, industry guest speakers, and educational workshops that combine culinary arts with scientific principles and nutritional knowledge.",
    baddyProbability: 0.81,
    url: "https://clubs.byu.edu/link/Clubs/FSA",
    image: "/images/clubs/food_science_club.png",
    cost: "Free",
    requestToJoin: true,
    time: "Every other Monday 1 PM",
  },
  {
    name: "French Association",
    description:
      "Immerse yourself in French culture and language while connecting with fellow Francophiles through conversation practice, cultural events, and activities that celebrate the beauty of French traditions and customs.",
    baddyProbability: 0.88,
    url: "https://clubs.byu.edu/link/Clubs/Le-Club",
    image: "/images/clubs/french_association.png",
    cost: "$6/semester or $10/year",
    requestToJoin: true,
  },
  {
    name: "Garden Club",
    description:
      "Develop your green thumb while building friendships through hands-on gardening projects, plant care workshops, and outdoor activities that teach sustainable growing practices and environmental stewardship.",
    baddyProbability: 0.83,
    url: "https://clubs.byu.edu/link/Clubs/Garden-Club",
    image: "/images/clubs/gardening_club.png",
    cost: "Free",
    time: "Tuesdays 7:00 PM - 8:30 PM",
  },
  // {
  //   name: "Gymnastics Club",
  //   description: "Show off your gymnastics skills!",
  //   baddyProbability: 0.85,
  //   url: "https://clubs.byu.edu/link/Clubs/Gymnastics",
  //   image:
  //     "https://static.wixstatic.com/media/e50ec7_bed475764bd1406e95993dac046b323b~mv2.jpg/v1/fill/w_640,h_480,fp_0.50_0.50,q_80,usm_0.66_1.00_0.01,enc_auto/e50ec7_bed475764bd1406e95993dac046b323b~mv2.jpg",
  //   cost: "$12/semester",
  //   time: "Tuesdays 7:00 PM - 9:00 PM",
  // },
  {
    name: "Illustration Association",
    description:
      "Join a creative community of artists where you can showcase your illustration talents, receive constructive feedback on your artwork, and collaborate with fellow visual storytellers to improve your skills.",
    baddyProbability: 0.86,
    url: "https://clubs.byu.edu/link/Clubs/Illustration-Association",
    image: "/images/clubs/illustration_association.png",
    cost: "Free",
    requestToJoin: true,
  },
  // {
  //   name: "International Folk Dance Club",
  //   description: "Learn about various folk dances and meet new people!",
  //   baddyProbability: 0.8,
  //   url: "https://clubs.byu.edu/link/Clubs/IFDC",
  //   time: "Wednesdays 7:00 PM - 8:30 PM",
  //   image:
  //     "https://www.wikidancesport.com/Attachments/Terminology/FolkDance/528.jpg",
  //   cost: "$40/semester",
  // },
  // {
  //   name: "Irish Dance Club",
  //   description: "Do some Irish dances!",
  //   baddyProbability: 0.73,
  //   url: "https://clubs.byu.edu/link/Clubs/IDC",
  //   image:
  //     "https://images.squarespace-cdn.com/content/v1/58d6f420a5790a257a8d95cd/1615404477921-QUNLICMPDLLET80RWFRL/Recital+3+%28Monday+Rehearsal%29+-+029+%28TWO_7515%29.jpg?format=1500w",
  //   cost: "Free",
  //   time: "Thursdays 7:00 PM - 8:30 PM",
  // },
  {
    name: "It's Just Dinner",
    description:
      "Navigate the world of dating with confidence through educational workshops, cultural discussions, and practical advice sessions designed to help you build meaningful relationships and understand modern dating dynamics.",
    baddyProbability: 0.83,
    url: "https://clubs.byu.edu/link/Clubs/Its-Just-Dinner",
    image: "/images/clubs/its_just_dinner.png",
    time: "2nd and 4th Tuesdays 7:00 PM",
  },
  {
    name: "Music Lovers",
    description:
      "Connect with fellow music enthusiasts through deep discussions about various genres, artist spotlights, album reviews, and musical experiences that celebrate the universal language of music and its impact on our lives.",
    baddyProbability: 0.74,
    url: "https://clubs.byu.edu/link/Clubs/Music-Lovers",
    image: "/images/clubs/music_lovers_club.png",
    requestToJoin: true,
    time: "Tuesdays 8:30 PM - 10:00 PM",
  },
  // {
  //   name: "Pickleball Club",
  //   description: "Play pickleball with others!",
  //   baddyProbability: 0.82,
  //   url: "https://clubs.byu.edu/link/Clubs/BYUPC2",
  //   image:
  //     "https://www.ussportscamps.com/media/images/pickleball/tips/what-is-pickleball-group-rally.jpg",
  //   cost: "$10/year",
  //   time: "Saturdays 2:00PM - 4:00 PM",
  // },
  // {
  //   name: "Salsa Club",
  //   description: "Learn about salsa dancing and have fun!",
  //   baddyProbability: 0.84,
  //   url: "https://clubs.byu.edu/link/Clubs/BYU-Salsa-Club",
  //   image: "https://razbakov.com/img/salsa_cubana.jpg",
  //   cost: "Free",
  //   time: "Tuesdays 8:30 PM - 10:00 PM",
  // },
  // {
  //   name: "Social Dance Club",
  //   description:
  //     "A great club for learning how to dance and find a new female friend!",
  //   baddyProbability: 0.9,
  //   url: "https://clubs.byu.edu/link/Clubs/BYU-SDC",
  //   image:
  //     "https://cdn-fhgnd.nitrocdn.com/gdRlBjBJEsIflRZaDbcgjDdgJxndYJwu/assets/static/optimized/rev-6bb43f7/wp-content/uploads/2022/11/DSC03119-1.jpg",
  //   cost: "Free",
  //   time: "Fridays 7:00 PM - 8:30 PM",
  // },
  // {
  //   name: "Tap Dance Association",
  //   description:
  //     "Tap Associaition provides students a place to study advanced levels of tap dance, learn and discuss the history of the art form and tap masters that have laid the foundation for tap dance. We have Thursday nights set aside for tap rehearsal, and will be working on strengthening tap technique, clarity of footwork, and choreography.",
  //   baddyProbability: 0.8,
  //   url: "https://clubs.byu.edu/link/Clubs/Tap-Association",
  //   image: "https://i.ytimg.com/vi/VZyyfX8WbT4/maxresdefault.jpg",
  //   cost: "Free",
  //   time: "Thursday nights",
  // },
  {
    name: "Speech and Debate",
    description:
      "Develop powerful communication skills through competitive debate, public speaking practice, and argumentation techniques that will enhance your ability to express ideas clearly and persuasively in academic and professional settings.",
    baddyProbability: 0.73,
    url: "https://clubs.byu.edu/link/Clubs/BYU-SD",
    image: "/images/clubs/speech_and_debate_club.png",
    cost: "Free",
  },
  {
    name: "Tall Club",
    description:
      "Connect with fellow tall students who understand the unique experiences and challenges of being tall, while building friendships and relationships with people who share your perspective and physical stature.",
    baddyProbability: 0.88,
    url: "https://clubs.byu.edu/link/Clubs/Tall-Club",
    image: "/images/clubs/tall_club.png",
    cost: "Free",
    time: "4th Tuesdays 8:30 PM - 10:00 PM",
  },
  // {
  //   name: "Yoga Club",
  //   description: "Learn about yoga and find a new friend!",
  //   baddyProbability: 0.89,
  //   url: "https://clubs.byu.edu/link/Clubs/Downwardcougar",
  //   image:
  //     "https://nutritionsource.hsph.harvard.edu/wp-content/uploads/2021/11/pexels-yan-krukov-8436601-copy-1024x768.jpg",
  //   cost: "Free",
  //   time: "Tuesdays 8:30 PM",
  // },
]

export default clubs
