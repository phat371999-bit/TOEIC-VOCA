import { ReadingTestData } from '../types';

export const readingPart7Tests: Record<number, ReadingTestData> = {
    1: {
        id: 1,
        title: 'Part 7 - Test 1',
        part: 7,
        passages: [
            {
                id: 'passage-7-1-1',
                text: `STOP! PLEASE READ FIRST.
Thank you for purchasing this item.
As you do the unpacking, please verify that all components are included and place them in a safe area to avoid loss or damage. Assemble the item on a soft surface or on the flattened empty box.
Follow the pictures and begin the assembly by placing the main part on its side. Never overtighten any screws or bolts, or you may damage the wood or cushioning. Please visit our Web site to obtain maintenance tips and register your product for warranty coverage: www.indoordelight.com.`,
                questions: [
                    { id: '147', questionText: 'Where is the information most likely found?', options: { A: 'On a door', B: 'On a receipt', C: 'In a box', D: 'On a Web site' }, correctAnswer: 'C' },
                    { id: '148', questionText: 'What kind of item is most likely discussed?', options: { A: 'A desktop computer', B: 'A piece of furniture', C: 'A household appliance', D: 'A power tool' }, correctAnswer: 'B' }
                ]
            },
            {
                id: 'passage-7-1-2',
                text: `We are asking all Winnipeg staff to keep a copy of this schedule at their desks as a quick reference tool for scheduling interoffice meetings. Whenever possible, please schedule these meetings during one of the underlined hours, that is, after 7:00 A.M. but before 11:00 A.M.
                
Winnipeg | Toulouse
---|---
7:00 A.M. | 2:00 P.M.
8:00 A.M. | 3:00 P.M.
9:00 A.M. | 4:00 P.M.
10:00 A.M. | 5:00 P.M.
11:00 A.M. | 6:00 P.M.
12:00 noon | 7:00 P.M.`,
                questions: [
                    { id: '149', questionText: 'What is suggested by the schedule?', options: { A: 'A conference has been scheduled.', B: 'A firm has offices in two time zones.', C: 'Administrative assistants make travel plans.', D: 'Some meeting times have been changed.' }, correctAnswer: 'B' },
                    { id: '150', questionText: 'What is indicated about 11:00 A.M. Winnipeg time?', options: { A: 'It is when the Winnipeg office closes for lunch.', B: 'It is when staff in Toulouse begin their workday.', C: 'It is not a preferred time to schedule a meeting.', D: 'It has just been added to the schedule.' }, correctAnswer: 'C' }
                ]
            },
            {
                id: 'passage-7-1-3',
                text: `The Bryant Foyer is one of the premier event spaces in our area. Set on a hill, it has expansive windows that provide sweeping views of the adjacent botanical gardens and the river. Built in 1897, it was the home of the Francona Charitable Trust until its renovation just over a year ago. Today, the space can accommodate up to 200 guests and is ideal for wedding receptions, office parties, and panel presentations. With its marble floors, cathedral ceiling, and stunning artwork, the Bryant Foyer is the ideal location for your next gathering.
                
The on-site restaurant, Andito's, caters our events and also operates as its own business. This farm-to-table restaurant, headed by chef Michaela Rymond, meets all dietary needs and has revolutionized the local food scene. Area residents know to plan far in advance to get a seat.
                
To reserve the event space or to make a dinner reservation, give us a call at 216-555-0157.`,
                questions: [
                    { id: '151', questionText: 'What is indicated about the Bryant Foyer?', options: { A: 'It is located on the shores of a lake.', B: 'It has recently been renovated.', C: 'It will build a botanical garden for guests.', D: 'It is reserved solely for corporate events.' }, correctAnswer: 'B' },
                    { id: '152', questionText: "What is suggested about Andito's?", options: { A: 'It was started by an international chef.', B: 'It offers limited menu options.', C: 'It is now funded by a charitable organization.', D: 'It is very popular with local residents.' }, correctAnswer: 'D' }
                ]
            },
            {
                id: 'passage-7-1-4',
                text: `Joan Chi (12:39 P.M.)
Hello Mina. Are you almost finished with the field measurements? I'm getting hungry.

Mina Evers (12:40 P.M.)
Sorry, Joan. I'm afraid you and Ms. Lim will have to go to lunch without me today. There's a problem with the site coordinates. This is going to take some time.

Joan Chi (12:51 P.M.)
Oh no. Should we bring something back for you?

Mina Evers (12:59 P.M.)
Get me a chicken sandwich.

Joan Chi (1:00 P.M.)
Sure thing, Mina. See you in a while.`,
                questions: [
                    { id: '153', questionText: 'At 1:00 P.M., what does Ms. Chi most likely mean when she writes, "Sure thing, Mina"?', options: { A: 'She will bring lunch for Ms. Evers.', B: 'She can provide a tool that Ms. Evers needs.', C: 'Some site coordinates are correct.', D: 'Some measurements must be double-checked.' }, correctAnswer: 'A' },
                    { id: '154', questionText: 'What will happen next?', options: { A: 'Ms. Chi will get new site coordinates.', B: 'Ms. Chi and Ms. Lim will be out for a while.', C: 'Ms. Evers will share a recipe.', D: 'Ms. Lim will begin taking measurements.' }, correctAnswer: 'B' }
                ]
            },
             {
                id: 'passage-7-1-5',
                text: `This season's excellent weather has yielded a substantial harvest of fruits and vegetables, in many cases more than growers may find buyers for. Those of you wishing to donate surplus produce to community organizations can do so by visiting Vosey Farm and Garden's Web site (www.vfgrdn.org), where you will find our list of drop-off locations.

If you need us to come to you instead, please contact us. We will reach out to one of the many independent truck drivers who have kindly volunteered to transport and quickly distribute your food donations to vetted groups that need it. Check our Web site for more information about this service as well as for insights into topics related to farming and gardening in the Northern Great Plains region.`,
                questions: [
                    { id: '155', questionText: 'For whom is the notice most likely intended?', options: { A: 'Farmers', B: 'Professional chefs', C: 'Truck drivers', D: 'Supermarket managers' }, correctAnswer: 'A' },
                    { id: '156', questionText: 'What does the notice indicate about the weather?', options: { A: 'It caused transportation delays.', B: 'It included heavier rain than usual.', C: 'It was frequently a topic in the local news.', D: 'It was beneficial for crops.' }, correctAnswer: 'D' },
                    { id: '157', questionText: 'What service does the notice mention?', options: { A: 'Staffing for local businesses', B: 'Food collection and distribution', C: 'Farm machinery repair', D: 'Gardening workshops' }, correctAnswer: 'B' }
                ]
            },
             {
                id: 'passage-7-1-6',
                text: `We are delighted that you are joining us for today's event. — [1] —. We ask that you adhere to the following guidelines to ensure that all attendees have an enjoyable experience.

Upon entering the venue, please put any and all electronic devices in silent mode. Ringtones and lit screens are very distracting to both the performers and your fellow audience members. — [2] —. Moreover, audience members are not allowed to make an audio or visual recording of the performance.

Bags and other items in the aisles pose a safety concern. — [3] —. If your bag is too big to fit properly under a seat, consider storing it in a locker for just $2. — [4] —. One of our attendants will gladly assist you with that.

Thank you for your cooperation.`,
                questions: [
                    { id: '158', questionText: 'Where most likely is the notice posted?', options: { A: 'In an airplane', B: 'In a concert hall', C: 'At a restaurant', D: 'At a post office' }, correctAnswer: 'B' },
                    { id: '159', questionText: 'What is stated about large bags?', options: { A: 'They can be put in a locked box for a fee.', B: 'They must be left outside the building.', C: 'They will be inspected by an attendant.', D: 'They must be stored under a seat.' }, correctAnswer: 'A' },
                    { id: '160', questionText: 'In which of the positions marked [1], [2], [3], and [4] does the following sentence best belong? "Please refrain from making phone calls or texting at all times."', options: { A: '[1]', B: '[2]', C: '[3]', D: '[4]' }, correctAnswer: 'B' }
                ]
            },
            {
                id: 'passage-7-1-7',
                text: `*E-mail*
To: Camille Ayala <ayala@esplinelectronics.com>
From: Masae Adachi <madachi@sweeterspecialties.com>
Date: February 12
Subject: Event order
Attachment: Sweeter Specialties Request Form

Dear Ms. Ayala,

Thank you for selecting our business to provide baked goods for the Esplin Electronics conference event in March. We are honored that you chose us for a fourth year in a row! On March 29, we will provide a large vanilla cake for each of the ten venues you indicated, and we will deliver a custom-baked multilayer cake on the following day. You will be billed on March 28. Please review the attached order form and return it to me within seven days.

Regarding the cake you ordered for March 30, our head pastry chef will produce it according to your specifications. In fact, he created a sample of the complete recipe earlier today—almond crème cake with fresh raspberry filling. We have judged it to be a delectable treat, and we are sure that you will be pleased.

If you have any concerns, just send me an e-mail. As always, we value your business.

Masae Adachi, Owner
Sweeter Specialties`,
                questions: [
                    { id: '161', questionText: 'What is the main purpose of the e-mail?', options: { A: 'To request confirmation of an order', B: 'To adjust some delivery dates', C: 'To announce the expansion of a business', D: 'To promote new dessert products' }, correctAnswer: 'A' },
                    { id: '162', questionText: 'What is suggested about Ms. Ayala?', options: { A: 'She is receiving a professional award.', B: 'She has worked as a pastry chef.', C: 'She has been a Sweeter Specialties client in the past.', D: 'She received a positive recommendation about a chef.' }, correctAnswer: 'C' },
                    { id: '163', questionText: 'What is indicated about the multilayer cake?', options: { A: 'It has been a best-selling product with clients.', B: 'It is the most expensive cake at Sweeter Specialties.', C: 'It is baked for Esplin Electronics annually.', D: 'It is a new flavor combination for Sweeter Specialties.' }, correctAnswer: 'D' },
                    { id: '164', questionText: 'The word "judged" in paragraph 2, line 3, is closest in meaning to', options: { A: 'criticized', B: 'settled', C: 'determined', D: 'described' }, correctAnswer: 'C' }
                ]
            },
            {
                id: 'passage-7-1-8',
                text: `Great Dishwasher!

I never had a dishwasher before. After remodeling my kitchen, I finally had room for a compact dishwasher. I did a lot of research, and the Dish Magic 300 seemed to be the best choice. It was pricier than other models, but all of the reviews were excellent. So, I decided to spend the extra money. I have had the dishwasher for one month now, and I could not be happier with my decision. Most importantly, the dishes come out sparkling clean, no matter how dirty they were going in. Also, the machine is so quiet, you do not even know it is running. Lastly, it is designed to use water efficiently, which is very important to me. Overall, I am very pleased with this dishwasher.

- Anna Yakovleva`,
                questions: [
                    { id: '165', questionText: 'Why did Ms. Yakovleva choose the Dish Magic 300 dishwasher?', options: { A: 'It was less expensive than most models.', B: 'It was the largest model available.', C: 'It was rated very highly.', D: 'It was the same brand as her other appliances.' }, correctAnswer: 'C' },
                    { id: '166', questionText: 'The word "running" in paragraph 1, line 7, is closest in meaning to', options: { A: 'adjusting', B: 'controlling', C: 'moving', D: 'operating' }, correctAnswer: 'D' },
                    { id: '167', questionText: 'What is indicated about Ms. Yakovleva?', options: { A: 'She cares about saving water.', B: 'She recently moved to a new home.', C: 'She bought the dishwasher a year ago.', D: 'She remodels kitchens professionally.' }, correctAnswer: 'A' }
                ]
            },
            {
                id: 'passage-7-1-9',
                text: `Skyler Airlines employs more than 20,000 people from all over the world. We're growing fast and have many positions available. — [1] —. So regardless of your background, there's probably a place for you on our team. Skyler employees enjoy many perks. — [2] —. For example, our discount program enables them to fly to any of our destinations for a fraction of the average ticket price. — [3] —. We offer upward and global mobility, tuition reimbursement, a mentorship program, and a generous compensation package. — [4] —. Annual paid vacations enable a comfortable work-life balance. It's no wonder that Skyler Airlines was named "Best Airline to Work For" by Travel Vista Journal three years in a row.`,
                questions: [
                    { id: '168', questionText: 'For whom is the information intended?', options: { A: 'Skyler Airlines employees', B: 'Skyler Airlines customers', C: 'Potential journal subscribers', D: 'Current job seekers' }, correctAnswer: 'D' },
                    { id: '169', questionText: 'In the information, what is NOT mentioned as being offered to employees?', options: { A: 'Payment for educational expenses', B: 'Free airline tickets', C: 'Opportunities for mentoring', D: 'Paid days off' }, correctAnswer: 'B' },
                    { id: '170', questionText: 'What is mentioned about Skyler Airlines?', options: { A: 'It flies to the most destinations around the world.', B: 'It is planning to merge with another airline.', C: 'It has been praised by a trade publication.', D: 'It has replaced its seats with more comfortable ones.' }, correctAnswer: 'C' },
                    { id: '171', questionText: 'In which of the positions marked [1], [2], [3], and [4] does the following sentence best belong? "Our openings cover a broad range of skill sets."', options: { A: '[1]', B: '[2]', C: '[3]', D: '[4]' }, correctAnswer: 'A' }
                ]
            },
            {
                id: 'passage-7-1-10',
                text: `Susan Gowan 9:16 A.M.
Good morning. The presentation slides about the new line of headphones are almost ready for distribution to our many partner stores. We are on track to send them out next Monday.
Maggie Lorenz 9:17 A.M.
How do they look?
Susan Gowan 9:20 A.M.
There are still some missing elements.
Alan Woodson 9:21 A.M.
We mainly need the information from the user studies that reviewed the headphones for sport use. We should have that report from the research and development office by Wednesday.
Maggie Lorenz 9:22 A.M.
Yes, let's not overlook that. And if you're concerned about the report not arriving by Wednesday, please contact Matt Harven and remind him to expedite a summary to us.
Susan Gowan 9:23 A.M.
Assuming we receive that summary soon enough to incorporate its findings into the slides, should the three of us schedule a trial run through the presentation on Thursday or Friday?
Maggie Lorenz 9:24 A.M.
Let's try for Thursday afternoon. Then we will still have Friday to make any necessary changes.
Alan Woodson 9:25 A.M.
Fine by me. I'm free after 2 P.M.`,
                questions: [
                    { id: '172', questionText: 'What is indicated about a presentation?', options: { A: 'It will be expensive to produce.', B: 'It will highlight some best-selling products.', C: "It will be Ms. Gowan's first project.", D: 'It will be sent to multiple locations.' }, correctAnswer: 'D' },
                    { id: '173', questionText: 'At 9:22 A.M., what does Ms. Lorenz imply when she writes, "let\'s not overlook that"?', options: { A: 'More staff should attend a meeting.', B: 'Information from the user studies is important.', C: 'The presentation must run smoothly.', D: 'Partner stores must be notified about an upcoming report.' }, correctAnswer: 'B' },
                    { id: '174', questionText: 'Who most likely is Mr. Harven?', options: { A: 'A store manager', B: 'An amateur athlete', C: 'A product researcher', D: 'An advertising executive' }, correctAnswer: 'C' },
                    { id: '175', questionText: 'When do the writers plan to meet to review a slide presentation?', options: { A: 'On Monday', B: 'On Wednesday', C: 'On Thursday', D: 'On Friday' }, correctAnswer: 'C' }
                ]
            },
            {
                id: 'passage-7-1-11',
                text: `FOR IMMEDIATE RELEASE
SYDNEY (4 June)—Kitchen Swifts and Chef Darius Cordero are joining together to give home cooks a new culinary experience. The award-winning chef is the owner of restaurants in both the Philippines and Australia, including the recently opened Enriqua's. He says his cooking reflects his Filipino heritage, which is a blend of many cultures.
"I've designed these simplified recipes for Kitchen Swifts so that cooks at home can enjoy new and exciting flavours with ease," he said. "While preparing and eating these meals, you can feel like you are travelling the world with me."
Zahra Chambers, vice president of Kitchen Swifts, says she is pleased to work with Chef Cordero and to offer delicious new recipes to their customers. Kitchen Swifts supplies menus, recipes, and ingredients for two people, four people, or six people, including a range of vegetarian selections. Customers choose the most appropriate meal options, and then a box is delivered weekly. Current customers will see no price increase with the partnership. To find out more, visit the Kitchen Swifts Web site at www.kitchenswifts.com.au.

---

https://www.sydneyrestaurants.com.au
A colleague arranged for us to eat at Enriqua's while I was at a conference in Sydney. It is usually fully booked for dinner; you may need to call months in advance for a table. We had a wonderful lunch there instead. Everything was delicious, and the bread and desserts are baked on-site! It was a worthwhile treat before I flew back to Hong Kong.
—Meili Guan`,
                questions: [
                    { id: '176', questionText: 'What is the purpose of the press release?', options: { A: 'To promote the opening of a restaurant', B: 'To announce a business partnership', C: 'To introduce a travel program', D: 'To congratulate an award recipient' }, correctAnswer: 'B' },
                    { id: '177', questionText: 'In the press release, the word “reflects" in paragraph 1, line 4, is closest in meaning to', options: { A: 'results in', B: 'changes', C: 'shows', D: 'thinks about' }, correctAnswer: 'C' },
                    { id: '178', questionText: 'What is indicated about Kitchen Swifts?', options: { A: 'It raised its prices for all customers.', B: 'It revised its delivery schedule.', C: 'It offers several meal options.', D: 'It has a new vice president.' }, correctAnswer: 'C' },
                    { id: '179', questionText: 'What is most likely true about Ms. Guan?', options: { A: "She went to Mr. Cordero's restaurant.", B: 'She recently went to Sydney for a vacation.', C: 'She is a colleague of Ms. Chambers.', D: 'She regularly orders from Kitchen Swifts.' }, correctAnswer: 'A' },
                    { id: '180', questionText: "What did Ms. Guan suggest about Enriqua's in the review?", options: { A: 'It has a limited lunch menu.', B: 'It takes dinner reservations.', C: 'It serves bread from a local bakery.', D: 'It has a location in Hong Kong.' }, correctAnswer: 'B' }
                ]
            },
            {
                id: 'passage-7-1-12',
                text: `To: laura.savard@orbitmail.scot
From: cboyle@ceoleire.co.uk
Date: 25 May
Subject: RE: Some suggestions

Dear Ms. Savard,
Thank you for your kind offer to either pick up your online order from my shop or to pay extra for air or train transport. Neither arrangement is necessary, as I am happy to deliver your items to you in Stranraer myself. It so happens that my sister and her children live nearby in Kirkcolm. Before seeing them, I will drive my rental car to your house and hand deliver the items to you.
As you know, my merchandise is 100 percent handcrafted. If any damage occurs in transit, the repair turns into an expensive, time-consuming ordeal. Over the years, I've seen too much damage done by inattentive baggage handlers. My policy is to deliver items personally whenever feasible or hire a ground- or sea-based courier service I trust.
I look forward to meeting you on 5 June. I expect to arrive at your house no later than 5 p.m.

Sincerely,
Conor Boyle
Ceoleire Classics

---

Northern Ireland Ferry Service
Date of Issuance: 26 May
Passenger Name: Conor Boyle
Departing Belfast: Friday, 5 June, 1:05 PM
Docking at Cairnryan: Friday, 5 June, 3:20 PM
Baggage: 1 suitcase (small), 2 instrument cases (1 mandolin, 1 guitar)
Vehicle transport: No
Adult Standard Class: £55.00
Please arrive 30 minutes prior to departure.`,
                questions: [
                    { id: '181', questionText: 'What is the purpose of the e-mail?', options: { A: 'To finalize a plan', B: 'To accept an invitation', C: 'To promote a new service', D: 'To request feedback on a policy' }, correctAnswer: 'A' },
                    { id: '182', questionText: 'Why will Mr. Boyle travel from Stranraer to Kirkcolm?', options: { A: 'To make a delivery', B: 'To attend a meeting', C: 'To drop off a rental car', D: 'To visit with family members' }, correctAnswer: 'D' },
                    { id: '183', questionText: 'What is indicated in the e-mail?', options: { A: "Mr. Boyle's sister is a cofounder of Ceoleire Classics.", B: 'Mr. Boyle has been disappointed by air- and train-freight companies.', C: 'Ms. Savard has purchased items from Mr. Boyle in the past.', D: 'Ms. Savard prefers a specific brand of luggage.' }, correctAnswer: 'B' },
                    { id: '184', questionText: 'What is most likely true about Ms. Savard?', options: { A: 'She often travels for her job.', B: 'She paid extra to have items hand delivered.', C: 'She recently purchased musical instruments.', D: 'She will meet Mr. Boyle at the rental car office.' }, correctAnswer: 'C' },
                    { id: '185', questionText: 'How is Mr. Boyle traveling to Cairnryan on June 5?', options: { A: 'By car', B: 'By train', C: 'By boat', D: 'By plane' }, correctAnswer: 'C' }
                ]
            },
            {
                id: 'passage-7-1-13',
                text: `Train to Achieve (TTA)—Our classes prepare you to succeed!
Profiled in the latest Business Directions Nigeria newsletter, Train to Achieve (TTA) is one of the most innovative training providers in West Africa. By offering our classes entirely in online format, we bring the classroom to your home. All classes include individualized instruction and are taught by recognized professionals in their respective fields. Upon successful completion of a class, you will receive an official Certificate of Training, a valuable addition to any résumé. For a complete list of class fees and schedules, visit our Web site at www.traintoachieve.org.ng. The following are some of our most popular classes.
- Introduction to Social Media Marketing (TTA1504): Taught by marketing consultant Marcus Akpan, the class equips you with the know-how to promote your business online.
- Become a Successful Freelance Writer (TTA3283): Business writer Brenda Akande gives you expert guidance on how to hone your writing skills and sell your writing services.
- Starting an Internet Radio Station (TTA7629): Online radio host Natalie Kabiru shows you how to appeal to your target market and gives practical tips for setting up your broadcast service.
- Basics of Graphic Design (TTA7633): Veteran graphic designer Doug Umaru helps you acquire the basic skills needed to start a graphic design business.

---

Discussion forum for students enrolled in Train to Achieve Class TTA1504
Posted on: 21 May, 9:41 A.M.
Posted by: Joseph Egbe
Subject: Presentations
Viewing the list of students enrolled in this class, I remembered chatting with some of you on the forum for January's poster design class. I look forward to sharing our learning experiences again for this class. Yesterday I was the second student to meet with Mr. Akpan for an individual videoconference about my business. I own a food truck from which I sell baked goods, and when I shared with Mr. Akpan the outline for my Web site, he suggested that I add a section with vivid images of all my baked goods. It was helpful advice.

---

Egbe's Bakery—Unique baked-in flavours in every bite!
- Section 1: Explore our menu and price list
- Section 2: Browse photos of our delicious treats
- Section 3: Learn about our catering services
- Section 4: View lists of ingredients`,
                questions: [
                    { id: '186', questionText: 'What is indicated about TTA?', options: { A: 'It was founded by a graphic designer.', B: 'It publishes its own online newsletter.', C: 'It offers classes led by industry professionals.', D: 'It has classroom facilities in cities across West Africa.' }, correctAnswer: 'C' },
                    { id: '187', questionText: 'According to the advertisement, what does TTA provide to students who finish a class?', options: { A: 'A résumé-writing workshop', B: 'A discount on a follow-up class', C: 'A list of current job postings', D: 'A certification document' }, correctAnswer: 'D' },
                    { id: '188', questionText: 'What is most likely true about Mr. Egbe?', options: { A: 'He helped design a discussion forum.', B: 'He has previously taken a TTA class.', C: 'He develops videoconferencing software.', D: 'He recently sold a bakery food truck.' }, correctAnswer: 'B' },
                    { id: '189', questionText: 'What TTA class is Mr. Egbe enrolled in?', options: { A: 'Introduction to Social Media Marketing', B: 'Become a Successful Freelance Writer', C: 'Starting an Internet Radio Station', D: 'Basics of Graphic Design' }, correctAnswer: 'A' },
                    { id: '190', questionText: 'What section did Mr. Egbe most likely add to the outline after speaking with Mr. Akpan?', options: { A: 'Section 1', B: 'Section 2', C: 'Section 3', D: 'Section 4' }, correctAnswer: 'B' }
                ]
            },
            {
                id: 'passage-7-1-14',
                text: `Caribbean Flavours Abound
By Rebecca Roats
NOTTINGHAM (1 August)—Orange Bay Kitchen has been serving up an infusion of Jamaican flavours in a laid-back Caribbean atmosphere for six months now. Managed by Keron Deslandes, the 150-seat restaurant is an aromatic jewel amid the bustling shops and eateries in Wester Square. The servers are always happy to help diners select from the variety of delights on the extensive menu, which includes curried goat, oxtail soup, and red snapper. The restaurant is most famous for its jerk chicken. Marinated for 24 hours prior to grilling and served with sides of stewed cabbage and coconut rice, the dish is a good deal at £12.
If you stop in on any Friday night between 7 and 11 P.M., you will enjoy live reggae music.

---

https://www.dinerreviews.co.uk/orangebaykitchen
Posted on 22 August by Tamika Peterkin, tpeterkin@sunmail.co.uk
Orange Bay Kitchen: 2/5 Stars
After reading a glowing article about Orange Bay Kitchen by Rebecca Roats, I was eager to give this place a try. My husband and I arrived there at 7 P.M. yesterday, keen to enjoy live music with our dinner. Unfortunately, the band's performance that night had been cancelled. Undeterred, we stayed and both ordered the jerk chicken. While the chicken's smoky flavour was outstanding, the stewed cabbage was lacking in flavour. Also, the portion size was smaller than we had anticipated, so we ordered another appetiser to avoid going home hungry. The head chef came out to apologise and was extremely nice, but we will probably not go back anytime soon.

---

E-Mail Message
To: tpeterkin@sunmail.co.uk
From: vsmith@orangebaykitchen.co.uk
Date: 24 August
Subject: Your review
Attachment: 0258
Dear Ms. Peterkin,
Thank you for visiting Orange Bay Kitchen and leaving a review. Our manager, Keron Deslandes, told me more about your visit and our failure to live up to your expectations that evening. Please accept the attached £20 gift certificate; I do hope that you will give us another try.
During your visit, our band had an equipment malfunction, which is what led to the last-minute cancellation. However, the band will be back performing weekly beginning in September. Also, I want you to know that Head Chef Adio Brown has changed the spices he uses in the stewed cabbage. I am sure you will find them delightful.
Sincerely,
Vea Smith, Owner
Orange Bay Kitchen`,
                questions: [
                    { id: '191', questionText: 'What does the article mention about Orange Bay Kitchen?', options: { A: 'It is currently hiring servers.', B: 'It is located on a quiet street.', C: 'It has another location in Jamaica.', D: 'It opened six months ago.' }, correctAnswer: 'D' },
                    { id: '192', questionText: 'According to the article, what is the most popular menu item at Orange Bay Kitchen?', options: { A: 'Red snapper', B: 'Oxtail soup', C: 'Jerk chicken', D: 'Curried goat' }, correctAnswer: 'C' },
                    { id: '193', questionText: "What is suggested about Ms. Peterkin's visit to Orange Bay Kitchen?", options: { A: 'She was there on a Friday.', B: 'She dined alone.', C: 'She requested extra rice.', D: 'She ordered dessert.' }, correctAnswer: 'A' },
                    { id: '194', questionText: 'What is a purpose of the e-mail?', options: { A: 'To answer a question', B: 'To offer an apology', C: 'To ask for feedback', D: 'To confirm a reservation' }, correctAnswer: 'B' },
                    { id: '195', questionText: 'Whom did Ms. Peterkin meet at Orange Bay Kitchen?', options: { A: 'Ms. Roats', B: 'Mr. Deslandes', C: 'Mr. Brown', D: 'Ms. Smith' }, correctAnswer: 'C' }
                ]
            },
            {
                id: 'passage-7-1-15',
                text: `Orbys Distributors
Client: Green Canyon | Date: June 10
Account: 4352-0
Item | Price
---|---
Garden soil, 33 cubic meters | $1,170.00
Crushed gravel, 30 metric tons | $1,710.00
Decorative stone, 20 metric tons | $1,140.00
70 paving stones, .6 x .6 meters | $630.00
Subtotal | $4,650.00
Discount (10%) | $465.00
Delivery charge | $350.00
Grand Total | $4,535.00
Please see the enclosed notice outlining important changes to your billing.

---

Orbys Distributors
To our valued customers:
Our current invoicing system has been in use since Orbys Distributors was founded over twenty years ago. As a much-needed upgrade, we are switching to electronic invoicing. Starting August 1, invoices will be generated automatically each month and will be sent to the e-mail address associated with your company's account.
Rest assured that our long-standing incentives remain in place:
- A 10% discount for orders of more than $4,000
- A 20% discount for charitable organizations
- Free deliveries to locations within 5 miles of one of our supply centers
- Free samples for members of our Frequent Buyer Club
More information about our transition to electronic invoicing is available on our Web site. Thank you for your support. Orbys Distributors appreciates your business.

---

*E-mail*
To: Mary Peterson, Billing Department
From: Tanvir Singh, Account Manager
Date: September 12
Subject: Account 1012-4
Hello Mary,
I received a query today from William Tesoriero at Tesoriero Remodeling. His monthly invoice for August never arrived.
As you know, Mr. Tesoriero was one of our very first customers. Since we first opened for business, he has made purchases from us on a regular basis. He is also a member of the Frequent Buyer Club. This is a customer we absolutely do not want to lose. I explained to him that the rollout of our electronic invoicing system did not go as smoothly as we had hoped and promised that this would not happen again.
I would appreciate it if you could please investigate the problem without delay and send the invoice for August to Mr. Tesoriero.
Tanvir`,
                questions: [
                    { id: '196', questionText: 'What does the invoice suggest about Green Canyon?', options: { A: 'It does landscaping projects.', B: 'It designs highways.', C: 'It repairs old houses.', D: 'It operates a farm.' }, correctAnswer: 'A' },
                    { id: '197', questionText: 'Why most likely did Green Canyon receive a discount on its order dated June 10?', options: { A: 'It is a charitable organization.', B: 'It belongs to the Frequent Buyer Club.', C: 'It spent more than $4,000 on merchandise.', D: 'It is located near an Orbys Distributors supply center.' }, correctAnswer: 'C' },
                    { id: '198', questionText: 'According to the notice, what is changing at Orbys Distributors?', options: { A: 'Its e-mail address', B: 'Its list of incentives', C: 'Its invoicing system', D: 'Its delivery schedule' }, correctAnswer: 'C' },
                    { id: '199', questionText: 'What is suggested about Mr. Tesoriero?', options: { A: 'He asked to meet with Mr. Singh.', B: 'He is interested in employment at Orbys Distributors.', C: 'He recently placed an order for some construction machinery.', D: 'He has been a customer of Orbys Distributors for about twenty years.' }, correctAnswer: 'D' },
                    { id: '200', questionText: 'What does Mr. Singh ask Ms. Peterson to do?', options: { A: 'Make a bill payment', B: 'Solve a problem', C: 'Confirm an order', D: 'Update an account number' }, correctAnswer: 'B' }
                ]
            }
        ]
    },
    2: {
        id: 2,
        title: 'Part 7 - Test 2',
        part: 7,
        passages: [
            {
                id: 'passage-7-2-1',
                text: `Focus Your Social Media Presence

For small-business owners, it can be a challenge to stand out in a competitive social media environment. Successfully reaching your target market involves knowing how and where to promote your products in a way that is effective and memorable. The Savan Business Center offers support for business owners who need a boost in doing just that. For over 50 years, we've been helping entrepreneurs grow their sales through insight of current industry trends and understanding of our clients' unique needs.

Let us help you get more organized in creating effective and far-reaching social media content. Our latest webinar, Focus Your Social Media Presence, will cover topics related to making your business stand out. You can sign up on our event Web page.

Date: February 5
Time: 10:00 A.M. to 11:00 A.M.
Event Web page: https://www.savanbusinesscenter.com/socialmedia`,
                questions: [
                    { id: '147', questionText: 'What is true about the Savan Business Center?', options: { A: 'It works with small businesses.', B: 'It publishes a weekly newsletter.', C: 'It recently launched a new Web site.', D: 'It is seeking suggestions for webinar topics.' }, correctAnswer: 'A' },
                    { id: '148', questionText: 'What is indicated about the webinar?', options: { A: 'It begins at 11:00 A.M.', B: 'It features advice on creating promotional content.', C: 'It is being offered every month.', D: 'It requires a small fee to attend.' }, correctAnswer: 'B' }
                ]
            },
            {
                id: 'passage-7-2-2',
                text: `Dine Out Darville Is Back!

Dine Out Darville, which runs this year from June 22 to 28, is the perfect chance to try a restaurant in Darville for the first time or revisit one of your favorite restaurants in town. You might even visit multiple restaurants during the weeklong event! Twelve popular restaurants will offer special four-course dinners—including a cup of soup, a salad, a main course, and a dessert—all for a reduced price of $30. Reservations are highly recommended. Dine Out Darville welcomes hundreds of locals and tourists each year, and you do not want to miss your opportunity to get a great meal at a great price.

Visit www.darvillebusinesscouncil.org/dineout for a list of participating restaurants.`,
                questions: [
                    { id: '149', questionText: 'What is mentioned about Dine Out Darville?', options: { A: 'It lasts for one week.', B: 'It is held in a different location each year.', C: 'It is being held for the first time.', D: 'It includes both lunch and dinner.' }, correctAnswer: 'A' },
                    { id: '150', questionText: 'What is NOT included in the reduced-price meals?', options: { A: 'A cup of soup', B: 'A salad', C: 'A dessert', D: 'A beverage' }, correctAnswer: 'D' }
                ]
            },
            {
                id: 'passage-7-2-3',
                text: `Rainsy To Move Headquarters

DADE (July 11)—Rainsy LLC announced yesterday that it is moving its headquarters to Dade.
A data storage and analytics firm currently based in Salt Creek, Rainsy has clients that include some of the country's largest credit card companies, online retailers, and software providers. Rainsy helps these businesses manage and understand their customer data.
Rainsy is not planning to close its current offices in Salt Creek. However, the Dade location will become its new base of operations, as several members of its executive team will work there. The company's chief executive officer and chief financial officer will relocate to Dade along with approximately 50 percent of the company's workforce.
The office of Rainsy's chief technology officer will remain in Salt Creek, as will the account management team. The company's new Dade offices are located at 12 Glacier Parkway.`,
                questions: [
                    { id: '151', questionText: 'What does Rainsy LLC do?', options: { A: 'It stores and analyzes consumer information.', B: 'It sells technology products online.', C: 'It processes credit card payments for retailers.', D: 'It develops computer software programs.' }, correctAnswer: 'A' },
                    { id: '152', questionText: 'Who will be based in Dade?', options: { A: "Rainsy's chief technology officer", B: 'The entire Rainsy executive team', C: "About half of Rainsy's employees", D: 'The Rainsy account management team' }, correctAnswer: 'C' }
                ]
            },
            {
                id: 'passage-7-2-4',
                text: `Michael Liu (9:43 A.M.)
Hi, Jana. I'm at Biz Plus. The paper you need is out of stock until next week. Will another color work?

Jana Bhat (9:45 A.M.)
What are the options?

Michael Liu (9:46 A.M.)
They have yellow, green, and pink in the brand that you prefer.

Jana Bhat (9:47 A.M.)
I really need blue. Are there other brands of blue printer paper?

Michael Liu (9:48 A.M.)
Yes, but they're all a darker blue. They also cost more.

Jana Bhat (9:49 A.M.)
OK, forget it. I'll place an order online.`,
                questions: [
                    { id: '153', questionText: 'What is suggested about the paper Mr. Liu is shopping for?', options: { A: 'It is light blue.', B: 'It is expensive.', C: 'It is sold exclusively at Biz Plus.', D: 'It has been discontinued.' }, correctAnswer: 'A' },
                    { id: '154', questionText: 'At 9:49 A.M., what does Ms. Bhat most likely mean when she writes, “OK, forget it"?', options: { A: 'She wants to check her budget.', B: 'She thinks Mr. Liu should not purchase paper at Biz Plus.', C: 'She believes Mr. Liu should not place an order this week.', D: 'She plans to cancel her order.' }, correctAnswer: 'B' }
                ]
            },
            {
                id: 'passage-7-2-5',
                text: `20 May
Neil Croft, Director
Queensland Libraries
13 Hummocky Road
Brisbane QLD 4003

Dear Mr. Croft,
— [1] —. I have read your inquiry about offering financial management courses at libraries across Queensland. The Society for Financial Management Advisors (SFMA) welcomes the opportunity to partner with the libraries to make basic financial management information more widely available.
You proposed that SFMA members could lead introductory courses at several library branches. — [2] —. SFMA members have offered similar courses to recent graduates, people changing careers, and first-time investors in the past.
— [3] —. If you have a list of library branches that would host the first series of events, I can suggest facilitators who work near those libraries or would be willing to travel to them. Do you have a general profile of the expected attendees? — [4] —. That information would help us tailor the courses to audience needs and interests.
I look forward to meeting with you to develop a plan. Please contact me by telephone at 07 5550 1344 to set up a time to discuss the courses.

Sincerely,
Roberta Otney
Chairperson, Society for Financial Management Advisors`,
                questions: [
                    { id: '155', questionText: 'Why did Ms. Otney write the letter?', options: { A: 'To welcome a new library director', B: 'To register for an SFMA finance course', C: 'To confirm some educational credentials', D: 'To reply to a question from Mr. Croft' }, correctAnswer: 'D' },
                    { id: '156', questionText: 'What is one thing Ms. Otney requested?', options: { A: 'A library membership', B: 'A list of course instructors', C: 'The locations of some libraries', D: "Mr. Croft's telephone number" }, correctAnswer: 'C' },
                    { id: '157', questionText: 'In which of the positions marked [1], [2], [3], and [4] does the following sentence best belong?\n"This is something I would be happy to arrange."', options: { A: '[1]', B: '[2]', C: '[3]', D: '[4]' }, correctAnswer: 'A' }
                ]
            },
            {
                id: 'passage-7-2-6',
                text: `Claro Vision
The difference is clear.

Take advantage of our limited-time offer: 50% off all eyeglass frames through 30 September

Other advantages available today and every day:
- Free eyeglass fittings and adjustments
- Money-back guarantee if you are not completely satisfied
- More than 500 locations in shopping malls throughout Canada
- Low-cost vision checkups by licensed opticians

To find a store near you, visit www.clarovision.ca/locations, or call 416-555-0122 today!`,
                questions: [
                    { id: '158', questionText: 'Why most likely was the advertisement created?', options: { A: 'To draw attention to an underused professional service', B: 'To publicize the benefits of a warranty policy', C: 'To announce the opening of new store locations', D: 'To promote a temporary price discount' }, correctAnswer: 'D' },
                    { id: '159', questionText: 'What is stated about Claro Vision stores?', options: { A: "They are larger than competitors' stores.", B: 'They accept all major credit cards.', C: 'They are located next to shopping malls.', D: 'They provide eyeglass fittings at no cost.' }, correctAnswer: 'D' },
                    { id: '160', questionText: 'What is stated about vision checkups?', options: { A: 'They are completed by a partner company.', B: 'They are performed by a certified professional.', C: 'They should be done every ten months.', D: 'They are offered on a limited number of days.' }, correctAnswer: 'B' }
                ]
            },
            {
                id: 'passage-7-2-7',
                text: `Questions 161-163 refer to the following letter.

Rossery Building Corporation
2710 South Exmouth Drive
Singapore 188509
1 April

Elizabeth Balakrishnan
Bala Home Furnishings
416 Holliton Drive C2
Singapore 793801

Dear Ms. Balakrishnan,
This is a reminder that the one-year lease for your space will end on 30 April. Please contact my office at 1555 0124 to make an appointment to renew your lease. There will be a small increase in rent and fees because of rising operating costs.

Updated charges upon lease renewal:
Monthly rental: S$1,800.00
Parking space fee: S$50.00
Cleaning service: S$10.00
Security fee: S$35.00
Total monthly charge: S$1,895.00

If you are not renewing your lease, please notify our office by 15 April. Plan to vacate the property by 5 P.M. on 30 April. There will be an inspection of the property, and there may be charges for repairs or damages beyond normal usage.

Kind regards,
Alexis Tan`,
                questions: [
                    { id: '161', questionText: 'What is the purpose of the letter?', options: { A: 'To explain the fees for equipment installation', B: 'To offer a discount on a service', C: 'To provide information about a lease agreement', D: 'To request a change to a property amenity' }, correctAnswer: 'C' },
                    { id: '162', questionText: 'According to the letter, what must Ms. Balakrishnan pay for each month?', options: { A: 'Furniture rental', B: 'Office supplies', C: 'An inspection fee', D: 'A parking space' }, correctAnswer: 'D' },
                    { id: '163', questionText: 'Who most likely is Ms. Tan?', options: { A: 'A repair person', B: 'A property manager', C: 'A cleaning person', D: 'A security company employee' }, correctAnswer: 'B' }
                ]
            },
            {
                id: 'passage-7-2-8',
                text: `Questions 164-167 refer to the following e-mail.

*E-mail*
To: lkhoury@britelyauto.co.uk
From: khagel@qualiview.co.uk
Date: 14 April
Subject: Your proposed changes

Dear Ms. Khoury,
Thank you for forwarding your proposed revisions to the contract for Qualiview Ltd. to be your wholesale supplier of automotive window glass.

First, we will gladly agree to an extension of the contract term from one to three years. Secondly, I am not sure what more we can do to address your concerns about packaging materials. We use custom-built crates and innovative packaging to reduce the risk of breakage during shipping. While we will replace any goods that may be damaged in transit, we do not agree to pay an additional penalty fee in the event of such damage.

I would like to discuss this further with you next week; however, I will be out of the office through Tuesday afternoon. Would you be available to meet before 11:00 A.M. on either Wednesday or Thursday? Friday is also possible. Please let me know a convenient date and time for you.

Best regards,
Karl Hagel
Qualiview Ltd.`,
                questions: [
                    { id: '164', questionText: 'Why did Mr. Hagel write the e-mail?', options: { A: 'To report damage to an item', B: 'To finalize a purchase', C: 'To request a product sample', D: 'To negotiate a contract' }, correctAnswer: 'D' },
                    { id: '165', questionText: 'What is indicated about Qualiview Ltd.?', options: { A: 'It sells its products online.', B: 'It makes windows for cars.', C: 'It has paid penalty fees in the past.', D: 'It recently redesigned its shipping crates.' }, correctAnswer: 'B' },
                    { id: '166', questionText: 'The word "address" in paragraph 2, line 2, is closest in meaning to', options: { A: 'respond to', B: 'think about', C: 'greet', D: 'deliver' }, correctAnswer: 'A' },
                    { id: '167', questionText: 'When is Mr. Hagel available next week?', options: { A: 'On Monday morning', B: 'On Tuesday afternoon', C: 'On Wednesday morning', D: 'On Thursday afternoon' }, correctAnswer: 'C' }
                ]
            },
            {
                id: 'passage-7-2-9',
                text: `Questions 168-171 refer to the following article.

Shipping Disruptions
SINGAPORE (6 June)—Recently, the demand for international freight space has been outpacing the availability of shipping containers. This container shortage has led to higher costs for goods being shipped out of Asian ports. A drop in the production of rolls of steel, the raw material that containers are made from, has further complicated the situation. — [1] —.
Some exporters have considered the more expensive option of air freight, but companies are still faced with a difficult choice. — [2] —. They must either ask their customers to accept shipment delays, or substantially raise customer prices to cover the costs of expedited shipping. Either way, suppliers risk triggering customer dissatisfaction.
"We are working with business partners, investors, and government officials to discuss solutions to this problem," said Henry Lam, a spokesperson for the household goods producer QET Group. — [3] —. "It's going to take total cooperation of all stakeholders to find a solution."
Not all companies are suffering, though. For example, Fezker, the producer of athletic apparel and footwear, has implemented strategies to better overcome this situation. Fezker has successfully refocused its efforts away from exports to western countries and toward expanding its domestic and regional markets. — [4] —.
"We moved quickly, so the shipping container shortage has not caused a significant impact on our profits," said Fezker CEO Nuwa Lee.`,
                questions: [
                    { id: '168', questionText: 'What is mentioned about shipping containers?', options: { A: 'They come in different sizes.', B: 'They are in short supply.', C: 'They are made from a variety of materials.', D: 'They can be used for long-term storage.' }, correctAnswer: 'B' },
                    { id: '169', questionText: 'What does Mr. Lam say is needed to resolve the situation?', options: { A: 'A sharp increase in the number of customers', B: 'A relaxation of government restrictions', C: 'The development of new technologies', D: 'Communication between affected groups' }, correctAnswer: 'D' },
                    { id: '170', questionText: 'What type of clothing does Fezker produce?', options: { A: 'Rain jackets', B: 'Sportswear', C: 'Business suits', D: 'Work uniforms' }, correctAnswer: 'B' },
                    { id: '171', questionText: 'In which of the positions marked [1], [2], [3], and [4] does the following sentence best belong?\n"These markets are supplied using more readily available truck and train transportation."', options: { A: '[1]', B: '[2]', C: '[3]', D: '[4]' }, correctAnswer: 'D' }
                ]
            },
            {
                id: 'passage-7-2-10',
                text: `Questions 172-175 refer to the following online chat discussion.

Gary Wendel (7:40 A.M.)
Good morning, team. Can you share the current status of your projects, please?
Jing Yu (7:42 A.M.)
I met with the client last week to confirm the start date for Phase B of the Palisade project.
Robbie Zuniga (7:43 A.M.)
I am headed to the job site now for the Riverview project. The rain last week delayed pouring the concrete for the sidewalks. I will check the conditions this morning to see if the situation has improved.
Gary Wendel (7:44 A.M.)
When will Phase B of the Palisade project begin?
Jing Yu (7:46 A.M.)
We will break ground in March and plan to have the building completed by November.
Gary Wendel (7:47 A.M.)
That's good news about the March start date. I am sure the client is happy about that.
Gary Wendel (7:50 A.M.)
Robbie, let me know what you find out about the site conditions. Perhaps Nathan Burry can help at the site. He's our most knowledgeable concrete finisher.
Robbie Zuniga (7:55 A.M.)
Actually, I'm meeting Nathan at the site this morning, so I'll get his opinion on when we can pour the concrete. The rest of the project is on hold until we can do this.
Gary Wendel (7:57 A.M.)
Keep me posted. I don't want to rush it if it's still too wet. At the same time, the Riverview project is already behind schedule because of equipment problems and late delivery of building materials.
Robbie Zuniga (7:58 A.M.)
Will do.`,
                questions: [
                    { id: '172', questionText: 'In what industry do the writers most likely work?', options: { A: 'Construction', B: 'Energy', C: 'Manufacturing', D: 'Travel' }, correctAnswer: 'A' },
                    { id: '173', questionText: 'Why did Mr. Wendel begin the discussion?', options: { A: 'To plan a client meeting', B: 'To discuss a weather forecast', C: 'To obtain an update on some work', D: 'To change the start date of an event' }, correctAnswer: 'C' },
                    { id: '174', questionText: 'What is indicated about the Riverview project?', options: { A: 'It has had several delays.', B: 'It is being managed by Ms. Yu.', C: 'It will be completed in November.', D: 'Its clients are happy with the progress.' }, correctAnswer: 'A' },
                    { id: '175', questionText: 'At 7:58 A.M., what does Mr. Zuniga most likely mean when he writes, "Will do"?', options: { A: 'He will revise a delivery schedule.', B: 'He will purchase more equipment.', C: 'He will hire workers to help at a site.', D: 'He will share the outcome of a meeting.' }, correctAnswer: 'D' }
                ]
            },
            {
                id: 'passage-7-2-11',
                text: `Questions 176-180 refer to the following e-mail and survey form.

From: Madalyn Kerluke <mkerluke@karabel.ca>
To: Omar Niklaus <oniklaus@karabel.ca>, Jay Toncic <jtoncic@karabel.ca>
Date: Friday, 3 February 2:16 P.M.
Subject: Taste-test results
Attachment: Fatior Labs survey results

Hi, Team,
I just received the 24-26 January survey results from Fatior Labs for our new ice-cream taste test. As you can see from the attached document, the results are very disappointing. We sent the four flavours that we considered to be the best, but none of them received high enough ratings to advance to the next stage of development. Most of the reviews were consistent among the 92 taste-test participants in our target market of consumers ages 25 through 40. It's not a big problem if a product gets low scores in colour in the testing phase, since we can easily adjust that in the laboratory. But we should never be sending out samples that are getting scores lower than 3 in the taste category.
I would like to meet at 9 A.M. on Monday (6 February) to figure out how to proceed. There is one flavour we may be able to work with if we make a few adjustments, as suggested by most of our taste testers. We will also need to get some new flavours to Fatior Labs no later than 1 March if we are going to get a new ice cream on the Preston Grocers freezer shelves by the beginning of June.

Madalyn Kerluke

---

Fatior Labs Consumer Taste-Testing Survey
Date: 24 January
Company: Karabel Industries
Participant number: 54

Directions: You will be given a 45 g sample of 4 different ice creams. Please rate the taste, texture, sweetness, and colour of each ice cream on a scale of 1 (very unpleasant) to 5 (very pleasant). Please write any additional comments below.

| Flavour | Taste | Texture | Sweetness | Colour |
|---|---|---|---|---|
| Lemon | 2 | 3 | 2 | 4 |
| Mango | 3 | 3 | 2 | 1 |
| Salted Caramel | 2 | 1 | 1 | 5 |
| Peanut Brittle | 3 | 4 | 2 | 2 |

Comments: The fruit-flavoured ice creams were surprisingly sour. I did not care for them at all. I think the Peanut Brittle has the most potential, but it's missing something. I bet that adding chocolate swirls or brownie bits would make it a winner.`,
                questions: [
                    { id: '176', questionText: 'What does the e-mail indicate about Karabel Industries ice cream?', options: { A: 'It is currently sold in four flavors.', B: 'Its coloring can be changed easily.', C: 'Its popularity has declined recently.', D: 'It is sold in Karabel Industries stores.' }, correctAnswer: 'B' },
                    { id: '177', questionText: 'What does Ms. Kerluke state that she wants to do?', options: { A: 'Visit a laboratory', B: 'Hold a team meeting', C: 'Contact a grocery store', D: 'Write new survey questions' }, correctAnswer: 'B' },
                    { id: '178', questionText: 'What is suggested about Fatior Labs?', options: { A: 'It has 92 employees.', B: 'It manufactures food colorings.', C: 'It will perform another taste test for Karabel Industries.', D: 'It supplies ice cream to Preston Grocers.' }, correctAnswer: 'C' },
                    { id: '179', questionText: 'Based on the survey form, what flavor will Karabel Industries most likely make adjustments to?', options: { A: 'Lemon', B: 'Mango', C: 'Salted Caramel', D: 'Peanut Brittle' }, correctAnswer: 'D' },
                    { id: '180', questionText: 'What can be concluded about participant number 54?', options: { A: 'The participant purchased several containers of ice cream.', B: 'The participant is between the ages of 25 and 40.', C: 'The participant regularly takes consumer surveys.', D: 'The participant prefers fruit-flavored ice cream.' }, correctAnswer: 'B' }
                ]
            },
            {
                id: 'passage-7-2-12',
                text: `Questions 181-185 refer to the following Web page and letter.

https://www.creategreat.ca/openings
Create Great, an Ontario-based creative agency with a diverse range of global clients in the fashion industry, is seeking a copywriter who is passionate about fashion, understands market trends, and handles digital tools with ease.
The ideal candidate will be someone who works well in a fast-paced environment with team members from international backgrounds. The copywriter will collaborate with the creative team to develop brand strategies that suit customer needs and with the marketing team to ensure the success of brand-based publicity campaigns for current and prospective clients. As remote work is permitted for copywriters, residence in Canada is not required.
To apply, send your cover letter and résumé to the director of our creative team, Fran Benjamin, Create Great, 838 Colbert Street, London, ON N6B 3P5. Application deadline: August 5.

---

Annie Smith
4810 South Bryant Street
Portland, OR 97206
August 6

Fran Benjamin
Create Great
838 Colbert Street
London, ON N6B 3P5

Dear Ms. Benjamin,
I am writing to apply for the copywriter position at Create Great. As an expert fashion designer who also has writing experience, I believe I would be a valuable addition to your team. Enclosed please find my résumé.
I have a decade of experience as the lead designer for women's collections at MODA, a clothing line in Portland. I oversee the design production process from initial market research to finished product. In my role, I work in close partnership with the marketing and production teams.
In addition, for the last five years, I have been maintaining my own blog. My posts focus on trends in women's fashion and how to make clothing and cosmetics more sustainable. What started as a hobby has now attracted paying advertisers and over 15,000 followers. Visit www.medesheen.com for examples of my writing.
Thank you for considering my application.

Sincerely,
Annie Smith`,
                questions: [
                    { id: '181', questionText: 'According to the Web page, what will the job recipient be able to do?', options: { A: 'Work remotely', B: 'Manage a team', C: 'Travel internationally', D: 'Relocate to Canada' }, correctAnswer: 'A' },
                    { id: '182', questionText: 'On the Web page, the word "suit" in paragraph 2, line 4, is closest in meaning to', options: { A: 'adapt', B: 'determine', C: 'invest', D: 'satisfy' }, correctAnswer: 'D' },
                    { id: '183', questionText: 'What is indicated about Ms. Smith?', options: { A: 'She has already met Ms. Benjamin.', B: 'She has worked as a copywriter.', C: 'She missed an application deadline.', D: 'She forgot to submit a required document.' }, correctAnswer: 'C' },
                    { id: '184', questionText: "According to the letter, what is one of Ms. Smith's responsibilities at MODA?", options: { A: 'Hiring fashion designers', B: 'Writing drafts of advertisements', C: 'Managing a production process', D: 'Researching sustainable clothing options' }, correctAnswer: 'C' },
                    { id: '185', questionText: 'What most likely is Medesheen?', options: { A: 'A brand of cosmetics', B: 'A fashion blog', C: 'An online magazine', D: 'An advertising agency' }, correctAnswer: 'B' }
                ]
            },
            {
                id: 'passage-7-2-13',
                text: `Questions 186-190 refer to the following e-mails and receipt.

E-Mail Message
From: Akihito Nakashima <a.nakashima@gilchristshipping.com>
To: Fowler Office Supplies <support@fowlerofficesupplies.com>
Subject: Order B19849
Date: August 19

To Whom It May Concern,
Yesterday, I purchased some office supplies on your Web site. I received an e-mail receipt, but the costs are not itemized on it. To satisfy a new company policy, I must give my supervisor a receipt with the charges for each item listed separately. Could you e-mail me such a receipt? If not, is it possible for me to get this information myself from your Web site? Finally, can confirmations for future orders possibly be sent to more than one e-mail address? It would be ideal for my supervisor to automatically receive one.
Thank you,
Akihito Nakashima, Executive Assistant
Gilchrist Shipping

---

E-Mail Message
From: Fowler Office Supplies <support@fowlerofficesupplies.com>
To: Akihito Nakashima <a.nakashima@gilchristshipping.com>
Subject: RE: Order B19849
Date: August 19
Attachment: B19849

Dear Mr. Nakashima,
Attached is the receipt you requested. In apology for the inconvenience, we will provide you with 10 percent off the total price of your next order. To view a full description of any previous order, first log in to your account on our Web site, go to the "My Orders" tab, and then click on any order number.
I noticed that included in each of your last few orders was an identical order for ten of a particular item. You should know that we will reduce the price for that item by 5 percent if you mark this as a recurring order. To do this, simply check the "Recurring Order" box on the online order form.
As for your final query, this is not possible right now. However, I will share the idea with our technical team.

All the best,
Cameron Higgins, Customer Relations
Fowler Office Supplies

---

Fowler Office Supplies
Receipt for Order: B19849
Order Date: August 18

| Item | Price | Quantity | Total |
|---|---|---|---|
| Printer paper | $8.00/500 sheets | 10 | $ 80.00 |
| Toner (black) | $50.00/cartridge | 1 | $ 50.00 |
| Gel pens (blue) | $5.00/8-pack | 3 | $ 15.00 |
| Staples | $3.50/box | 2 | $ 7.00 |
| **GRAND TOTAL** | | | **$152.00** |

Return Policy: Unopened merchandise may be returned by mail or in one of our stores within 60 days of purchase. For returns by mail, log in to your www.fowlerofficesupplies.com account to print a shipping label. For in-store returns, bring the item and the order number to any Fowler Office Supplies location.`,
                questions: [
                    { id: '186', questionText: 'Why did Mr. Nakashima send the e-mail?', options: { A: 'He did not receive an item he ordered.', B: 'He was mistakenly charged twice for an item.', C: 'He received a receipt that was not detailed enough.', D: 'He did not get a confirmation e-mail for a purchase he made.' }, correctAnswer: 'C' },
                    { id: '187', questionText: 'According to the second e-mail, what will Mr. Nakashima receive with his next order?', options: { A: 'A catalog', B: 'A free pen', C: 'A printed receipt', D: 'A price discount' }, correctAnswer: 'D' },
                    { id: '188', questionText: 'For what item does Mr. Higgins suggest that Mr. Nakashima select "Recurring Order"?', options: { A: 'Printer paper', B: 'Toner', C: 'Gel pens', D: 'Staples' }, correctAnswer: 'A' },
                    { id: '189', questionText: 'What will Mr. Higgins ask the technical team to look into?', options: { A: "Improving the Web site's response rate", B: 'Providing an option to send receipts to multiple e-mail addresses', C: "Placing a link to customers' order history on the home page", D: 'Making return labels printable from any device' }, correctAnswer: 'B' },
                    { id: '190', questionText: 'What is needed to return an item at a Fowler Office Supplies store?', options: { A: 'The original receipt', B: 'A credit card number', C: 'A confirmation e-mail', D: 'The order number' }, correctAnswer: 'D' }
                ]
            },
            {
                id: 'passage-7-2-14',
                text: `Questions 191-195 refer to the following article, Web site, and receipt.

Crawford and Duval Opens Brick-and-Mortar Stores
HONG KONG (18 February)—Crawford and Duval, the online retailer known for its handcrafted blankets, decorative pillows, and other household goods, has established four brick-and-mortar stores in Hong Kong. Last Monday, the company celebrated the grand opening of boutique stores in Causeway Bay, Discovery Bay, and Sheung Wan in addition to a large department store in Central District. While the boutique stores carry the most popular of the small household goods for which Crawford and Duval is famous, the Central District location also boasts an indoor plant department and an on-site café that features specialty coffees, teas, and light snacks. Moreover, it has a much more extensive selection of the merchandise than what is available through the company's Web site.

---

https://www.crawfordandduval.com.hk
Crawford and Duval comes to our loyal shoppers in Hong Kong!
Crawford and Duval is pleased to announce the opening of its first brick-and-mortar stores in the following locations: Causeway Bay, Discovery Bay, Sheung Wan, and Central District.
Since the launch of our online store five years ago, we have helped you to create the living space of your dreams. Now we make it even easier to decorate your home. Each location has an interior designer on staff, so you can consult with an expert in person while you browse our popular items.
All locations are convenient to public transportation. Our Central District location offers free parking in its attached car park.
As part of our grand-opening celebration, shoppers who visit one of our stores before 1 March will receive a gift card for HK$70 to use during their visit.
Members of our online Frequent Purchase Club will receive the same benefits in our stores, including a 10 percent discount on purchases of HK$500 or more.

---

Crawford and Duval
Customer Receipt
Date: 23 February

| Item | Price |
|---|---|
| Bamboo table lamp | HK$1,450.00 |
| Decorative cushions, set of two | HK$750.00 |
| Aloe plant in a 7.5-litre planter | HK$300.00 |
| Machine-washable wool blanket | HK$2,000.00 |
| **Sub Total** | **HK$4,500.00** |
| Less 10% | HK$450.00 |
| **TOTAL** | **HK$4,050.00** |

Credit card number: ************5598
Name on the credit card: Mei-Lin Fong
Stop at our in-store café for a treat!`,
                questions: [
                    { id: '191', questionText: 'What is the purpose of the article?', options: { A: 'To compare locally made products', B: 'To announce store openings', C: 'To list changes to a Web site', D: 'To review a café' }, correctAnswer: 'B' },
                    { id: '192', questionText: 'What does the Web site indicate about Crawford and Duval?', options: { A: 'It has store locations around the world.', B: 'It has been in business for ten years.', C: 'It employs interior designers.', D: 'It offers free parking at all of its stores.' }, correctAnswer: 'C' },
                    { id: '193', questionText: 'According to the receipt, what is indicated about the blanket?', options: { A: 'It can be washed by machine.', B: 'It is made of cotton.', C: 'It is queen-sized.', D: 'It comes in a set with pillows.' }, correctAnswer: 'A' },
                    { id: '194', questionText: 'Where most likely did Ms. Fong make her purchase?', options: { A: 'On a Web site', B: 'In a boutique shop', C: 'At a café', D: 'In a department store' }, correctAnswer: 'D' },
                    { id: '195', questionText: 'What is suggested about Ms. Fong?', options: { A: 'She often buys food from Crawford and Duval.', B: 'She is a member of the Frequent Purchase Club.', C: 'She applied a gift card to her purchase.', D: 'She shopped during a grand-opening event.' }, correctAnswer: 'B' }
                ]
            },
            {
                id: 'passage-7-2-15',
                text: `Questions 196-200 refer to the following Web pages.

https://www.osawacorporateteambuilding.com/home
Osawa Corporate Team Building
Bring your team together to promote cooperation while having fun! Our activities increase job satisfaction and engagement. We do all the planning so you can relax. Simply choose the event that is right for your team.
Scavenger Hunt—An outdoor game in which teams are given a list of objects to find and photograph with their phone or camera. Group size: 10-50 people. Time: 3 hours.
Game Day—This is a high-energy game day with fun team activities. This event builds team strength, communication, and problem-solving skills. Group size: 20-500 people. Time: 2 hours.
Team Painting—Each team member creates a painting outdoors based on a predetermined theme. The paintings are linked together at the end. Group size: 6-30 people. Time: 1-2 hours.
Robot Building—Your group will be broken into teams. Each team builds a robot to be used in challenges against the others. Group size: 10-30 people. Time: 2-3 hours.
All Chocolate—Your group will have the chance to use engineering skills to build a tower of chocolate. Then you learn how to make chocolate from a local chocolatier. Group size: 8-150 people. Time: 2 hours.
Book an event in October and receive 15 percent off.

---

https://www.osawacorporateteambuilding.com/requests
Name: Alexandra Peterson
Company name: Whitten Tech
E-mail address: apeterson@whittentech.com
Phone: 617-555-0123
Location and date of event: Downtown Boston, October 15
What events are you interested in? Choose your top three.
1 Game Day | 2 Scavenger Hunt | 3 Team Painting
Number of participants: 28 people
Additional information: We are interested in a fun activity for our sales team before the busy selling season begins. We spend a lot of time in the office, so we want an outdoor event.
We will contact you within three business days with a quote and confirmation.

---

https://www.osawacorporateteambuilding.com/reviews
What Our Customers Are Saying
Posted by Whitten Tech on October 20
Our team hired Osawa Corporate Team Building to lead an activity for the sales staff at Whitten Tech. The facilitator of the Scavenger Hunt, Lorenzo Benford, was excellent. The 28 members of our sales team all had positive feedback. They reported that they loved exploring the city, learning about its history, and finding new local attractions, even on a cold and cloudy day. I highly recommend this activity. The only downside was that we did not realize how far we would be walking. It would have been helpful to have an idea of the walking distances so we could have been fully prepared.`,
                questions: [
                    { id: '196', questionText: 'What does the first Web page indicate about the Scavenger Hunt?', options: { A: 'It requires participants to rent a camera.', B: 'It concludes with prizes for participants.', C: 'It is a suitable activity for indoors.', D: 'It takes three hours to complete.' }, correctAnswer: 'D' },
                    { id: '197', questionText: 'What event is best for a group of more than 200 people?', options: { A: 'Game Day', B: 'Team Painting', C: 'Robot Building', D: 'All Chocolate' }, correctAnswer: 'A' },
                    { id: '198', questionText: 'What is suggested about Ms. Peterson?', options: { A: 'She has joined the Building Robots event in the past.', B: 'She will receive a discount on an event.', C: 'She recently started a job at Whitten Tech.', D: 'She used to be an event planner.' }, correctAnswer: 'B' },
                    { id: '199', questionText: 'What can be concluded about Whitten Tech?', options: { A: 'It changed its number of event participants.', B: 'It provided its staff with free passes to museums.', C: 'It was unable to schedule its first-choice activity.', D: 'It was not able to hold its event outside.' }, correctAnswer: 'C' },
                    { id: '200', questionText: 'According to the review, what was disappointing about the event?', options: { A: 'The focus on local history', B: 'The lack of information about walking distances', C: 'The difficulty in keeping the group together', D: 'The uninteresting facilitator' }, correctAnswer: 'B' }
                ]
            }
        ]
    },
    3: {
        id: 3,
        title: 'Part 7 - Test 3',
        part: 7,
        passages: [
            {
                id: 'passage-7-3-1',
                text: `Medillo Shoes Celebrates Twenty Years in Cape Town!
246 Breda Place, Wynberg, Cape Town 7800
021 555 0149 | www.medilloshoes.co.za

Does your job require you to stand all day long? Get the support you need! At Medillo Shoes, we specialise in comfortable, supportive footwear that is stylish and suitable for any business or medical setting.
Visit us on 10 May to receive 20 percent off your purchase of one or more pairs of shoes during this anniversary event. Should you need assistance finding the best shoes for your professional needs, our footwear specialists will be on hand to help. Schedule a free consultation at www.medilloshoes.co.za to avoid a long wait.`,
                questions: [
                    { id: '147', questionText: 'What will happen at Medillo Shoes on May 10?', options: { A: 'All shoes will be discounted.', B: 'Shop assistants will be hired.', C: 'A shoe style will be discontinued.', D: 'Operational hours will be extended.' }, correctAnswer: 'A' },
                    { id: '148', questionText: 'What is indicated about Medillo Shoes?', options: { A: 'It has been in business for ten years.', B: 'It specializes in athletic footwear.', C: 'It is located next to a medical center.', D: 'It allows customers to make appointments.' }, correctAnswer: 'D' }
                ]
            },
            {
                id: 'passage-7-3-2',
                text: `To: Sales Team
From: Neil Cullen
Date: 10 April
Subject: My schedule next week

Dear Team,
I will be out of the office next week, from 15 to 19 April, attending the conference of the National Technology Alliance in Glasgow. While away, I will check e-mail and voice mail infrequently. For any urgent matters, please contact my assistant, Christina Choo. If you have a specific question about the Ezenx Industries account, please e-mail Mya Soroka. I will be back in the office on 22 April and will see all of you then.

Best,
Neil Cullen, Director of Sales and Marketing
Shallok Technology`,
                questions: [
                    { id: '149', questionText: 'What is the purpose of the e-mail?', options: { A: 'To register for a conference', B: 'To announce a new account', C: 'To schedule a meeting', D: 'To inform colleagues of an absence' }, correctAnswer: 'D' },
                    { id: '150', questionText: 'What is most likely true about Ms. Soroka?', options: { A: 'She will be traveling with Mr. Cullen.', B: 'She works on the Ezenx Industries account.', C: "She is Ms. Choo's supervisor.", D: 'She will be out of the office until April 22.' }, correctAnswer: 'B' }
                ]
            },
            {
                id: 'passage-7-3-3',
                text: `CITY OF BRYANTON
Building Permit Office
Notice for residents and contractors working in Bryanton

Beginning on Monday, July 1, the City of Bryanton's Building Permit Office, located at 912 Fir Avenue, will be open from Monday to Thursday, 9:00 A.M. to 5:00 P.M. Applications for permits will no longer be accepted on Fridays or Saturdays. The average processing time for permit applications will remain three business days. With this change, the city will lower its operating costs while maintaining its high standards of service for residents.`,
                questions: [
                    { id: '151', questionText: 'What change is the Building Permit Office making?', options: { A: 'It is moving to a new location.', B: 'It is simplifying the permit application process.', C: 'It is reducing the number of days it will accept permit applications.', D: 'It is increasing the processing time for permit applications.' }, correctAnswer: 'C' },
                    { id: '152', questionText: 'According to the notice, why is the change being made?', options: { A: 'To save the city money', B: 'To attract more residents', C: 'To improve the quality of service', D: 'To decrease the number of new permit applications' }, correctAnswer: 'A' }
                ]
            },
            {
                id: 'passage-7-3-4',
                text: `https://www.riverthamestours.uk/order/confirmation
River Thames Tours
Thank you for reserving a River Thames tour with us. We are eager to welcome you aboard. Each tour lasts 3 hours. Your tour includes a luncheon served at 1:00 p.m. Please consult our Web site for a menu. Should you have any dietary restrictions and like to request a special meal, please contact our customer experience manager, Martin Torma, at least 48 hours prior to your tour.
This reservation also entitles you to a 10 percent discount on a walking tour by Edgerton Walking Tours—just provide your confirmation code when booking.

Name: Lewis Califf
Purchase Date: 18 April
Confirmation Code: H102057
Tour Start: 1 May, 11:30 a.m.
Quantity: 4
Total: £180.00
Payment: Credit card ending in 1037

Please note: Boarding ends 10 minutes before departure time. Tours cannot be rescheduled.`,
                questions: [
                    { id: '153', questionText: 'What is indicated about the river tour?', options: { A: 'It is one hour long.', B: 'It comes with a meal.', C: 'It can be rescheduled.', D: 'It sells out quickly.' }, correctAnswer: 'B' },
                    { id: '154', questionText: 'How many tickets did Mr. Califf purchase?', options: { A: '1', B: '3', C: '4', D: '7' }, correctAnswer: 'C' },
                    { id: '155', questionText: 'How can customers receive a discount on a walking tour?', options: { A: 'By making a reservation online', B: 'By paying with a credit card', C: 'By requesting a coupon from the captain', D: 'By mentioning a confirmation code' }, correctAnswer: 'D' }
                ]
            },
            {
                id: 'passage-7-3-5',
                text: `Michiko Saunders [8:06 A.M.]
Hi, Jacob. Are you on your way to the office?

Jacob Kwon [8:08 A.M.]
Yes. I should be there in about 25 minutes.

Michiko Saunders [8:10 A.M.]
OK. I was just starting to print out the design proposal for the Dansby Group, but we've run out of paper. And we don't have another delivery of it coming until Wednesday.

Jacob Kwon [8:12 A.M.]
I see an office supply store across the street. It just opened for the day.

Michiko Saunders [8:13 A.M.]
Fantastic. Three packs of paper should be enough.

Jacob Kwon [8:15 A.M.]
OK. By the way, when will the representatives from the Dansby Group be coming to our office? I could also pick up some coffee and snacks for that meeting.`,
                questions: [
                    { id: '156', questionText: 'At 8:12 A.M., what does Mr. Kwon most likely mean when he writes, "I see an office supply store across the street"?', options: { A: 'He needs help finding a building.', B: 'He can purchase some paper.', C: 'He will look for a new printer.', D: 'He is going to negotiate a delivery schedule.' }, correctAnswer: 'B' },
                    { id: '157', questionText: 'What will Ms. Saunders most likely do next?', options: { A: 'Reschedule a meeting', B: 'Prepare some refreshments', C: 'Check on an arrival time', D: 'Revise a design proposal' }, correctAnswer: 'C' }
                ]
            },
            {
                id: 'passage-7-3-6',
                text: `Kipbank Business Services
548 Sycamore Lake Road
Green Bay, WI 54301
April 2

Madeline Omar
Passionflower Interior Design
1556 Deer Run Road
Green Bay, WI 54301

Dear Ms. Omar,
A business owner's days are filled with juggling the wants, needs, and demands of customers, staff, and suppliers. — [1] —
Let Kipbank find the right solutions for your small business so that you can focus on your products and people. Kipbank offers checking accounts, corporate credit cards, business loans, and payroll and bookkeeping services. — [2] —. This fall, we will also add financial planners to our team to help you and your employees plan for your futures.
With our corporate credit cards, Kipbank customers can take advantage of money-saving offers from selected hotel, office supply, and air travel partners. — [3] —. These deals are automatically applied to qualified purchases. And the business owner can place spending limits on each card. — [4] —.
Please call us at 920-555-0122 to set up an appointment or just stop by when it is convenient. We look forward to meeting you and providing your enterprise with superior service.

Sincerely,
Thomas Piskorksi, Kipbank Customer Concierge`,
                questions: [
                    { id: '158', questionText: 'What is suggested about Ms. Omar?', options: { A: 'She is an accountant.', B: 'She works for Mr. Piskorksi.', C: 'She operates a small company.', D: 'She is a Kipbank customer.' }, correctAnswer: 'C' },
                    { id: '159', questionText: 'What is stated about the credit cards?', options: { A: 'They come in a variety of colors.', B: 'They require an annual fee.', C: 'They include discounts on certain purchases.', D: 'They can be used to buy personal items.' }, correctAnswer: 'C' },
                    { id: '160', questionText: 'In which of the positions marked [1], [2], [3], and [4] does the following sentence best belong?\n"Everyday financial details only add more distractions."', options: { A: '[1]', B: '[2]', C: '[3]', D: '[4]' }, correctAnswer: 'A' }
                ]
            },
            {
                id: 'passage-7-3-7',
                text: `OTTAWA (22 May)—Waldenstone Business Review has added a new category to its esteemed international business awards this year. The Waldenstone Corporate Prize is awarded to a business with the foresight to develop strategies that help ensure the company's long-term viability.
This year's award was presented to Carila Corporation, a major player in the electronics sector. Under the direction of CEO Atsak Kakar, Carila Corporation went from near bankruptcy to a high level of profitability in just three years.
"Winning this award was very gratifying, not just for me but for the entire company,” Mr. Kakar said upon receiving the award. "Everyone has worked extremely hard to get this company back on solid financial ground. The long-term solution has brought exceptional value to our shareholders."`,
                questions: [
                    { id: '161', questionText: 'What is the purpose of the article?', options: { A: 'To profile a newly opened business', B: 'To analyze a trend in the electronics industry', C: "To highlight a company's achievement", D: 'To discuss changes to an employment contract' }, correctAnswer: 'C' },
                    { id: '162', questionText: 'What is suggested about Carila Corporation?', options: { A: 'It no longer develops electronics.', B: 'It was once a struggling business.', C: 'It has been unable to attract more clients.', D: 'It is seeking to replace its CEO.' }, correctAnswer: 'B' },
                    { id: '163', questionText: 'The word "solution" in paragraph 3, line 6, is closest in meaning to', options: { A: 'mixture', B: 'proof', C: 'statement', D: 'answer' }, correctAnswer: 'D' }
                ]
            },
            {
                id: 'passage-7-3-8',
                text: `Commbolt is for Everyone!
As a Commbolt customer, you've come to expect the best in reliable high-speed Internet, straightforward pricing options, and top-notch customer service from friendly professionals who are responsive to your every need. — [1] —. Unlike the competition, we promise to never lock you into inflexible contracts or suddenly raise your monthly bill without notice.
At Commbolt, we know you have options when it comes to choosing an Internet service provider. — [2] —. To show our gratitude for your loyalty, we are offering a special limited-time referral bonus.
The way it works is simple. — [3] —. You can use e-mail, social media, or even text messages to tell everyone about Commbolt. When a new user signs up using your code, each of you will receive a monetary credit. Receive $10 when new referrals sign up for a monthly plan at $45, and receive $20 for a plan costing $60 per month. The best news? — [4] —. There is no limit to the credits; the more people you sign up, the more money you get.
Your unique code is XA4R177.`,
                questions: [
                    { id: '164', questionText: 'What Commbolt benefit does the advertisement mention?', options: { A: 'Its low prices', B: 'Its excellent customer service', C: 'Its lifetime contracts', D: 'Its convenient installation schedule' }, correctAnswer: 'B' },
                    { id: '165', questionText: 'What is the maximum amount a customer can earn when one referred person signs up for service?', options: { A: '$10.00', B: '$20.00', C: '$45.00', D: '$60.00' }, correctAnswer: 'B' },
                    { id: '166', questionText: 'What is true about the Commbolt promotion?', options: { A: 'It may not be posted on social media.', B: 'It does not provide credit for more than three referrals.', C: 'It is expected to run for a full year.', D: 'It rewards both new and existing customers.' }, correctAnswer: 'D' },
                    { id: '167', questionText: 'In which of the positions marked [1], [2], [3], or [4] does the following sentence best belong?\n"Just share your unique referral code with friends and family."', options: { A: '[1]', B: '[2]', C: '[3]', D: '[4]' }, correctAnswer: 'C' }
                ]
            },
            {
                id: 'passage-7-3-9',
                text: `https://www.sarahscatering.com
Sarah's Catering—What You Serve Matters
Sarah's Catering is a family-owned-and-operated company. The company was founded ten years ago with a mission to provide the highest quality catering services in our community. We work closely with local growers and use only the freshest ingredients. Our menu items can be adapted to the client's taste or dietary needs. For example, we can prepare vegetarian, vegan, and gluten-free options.
We provide catering for birthday parties, wedding receptions, corporate meetings, business holiday parties, and many other types of events. From planning the menu and preparing your food to engaging servers and cleanup staff for the event, Sarah's Catering has it covered.
Sarah's Catering can cater lunches in your office for a minimum of twenty people. We offer delicious options to make your group's meal a satisfying experience.
We're here to serve you! Ordering is fast and simple. Visit www.sarahscatering.com/quote to request a cost estimate for your next event.

What people are saying
"Sarah's Catering was very easy to work with, and the food was delicious! Everyone in the office commented on how good the food was." — Glen Liu, Perkins Real Estate
"All the food was perfect, and the staff was the best." — Annie Pierce, Kania Marketing, Inc.`,
                questions: [
                    { id: '168', questionText: "What is indicated about Sarah's Catering?", options: { A: 'It uses locally sourced products.', B: 'It is twenty years old.', C: 'It specializes mainly in weddings.', D: 'It has an on-site dining room.' }, correctAnswer: 'A' },
                    { id: '169', questionText: 'The word "taste" in paragraph 1, line 4, is closest in meaning to', options: { A: 'preference', B: 'sample', C: 'experience', D: 'flavor' }, correctAnswer: 'A' },
                    { id: '170', questionText: "What is mentioned as a service provided by Sarah's Catering?", options: { A: 'Entertainment planning', B: 'Cooking demonstrations', C: 'Cleanup after meals', D: 'Rentals of tables and chairs' }, correctAnswer: 'C' },
                    { id: '171', questionText: 'Who most likely is Mr. Liu?', options: { A: "An employee of Sarah's Catering", B: 'A professional event manager', C: "A customer of Sarah's Catering", D: 'An assistant at a marketing firm' }, correctAnswer: 'C' }
                ]
            },
            {
                id: 'passage-7-3-10',
                text: `Marcus Steuber [10:41 A.M.] Are we still planning to have the author video conference today? I haven't yet received a meeting invitation.
Brinda Rajan [10:42 A.M.] I do have the meeting on my calendar. Let me forward it to you; it appears our editorial assistant didn't include you.
Marcus Steuber [10:43 A.M.] Thanks, I just received it. The timing doesn't work for me, though. I have an appointment with Hazel Luong to discuss the printing issues at our Singapore plant.
Brinda Rajan [10:44 A.M.] Could you postpone that? The new author we're working with really needs your guidance on the final book design and formatting. You're our most knowledgeable production editor.
Marcus Steuber [10:45 A.M.] Let me check with my supervisor. I'll add Mr. Borg to our chat.
Joshua Borg [10:47 A.M.] Hi, team. Marcus, you should prioritize your appointment with Hazel. I'll be visiting the plant next week, and we need to have some viable solutions before then.
Brinda Rajan [10:48 A.M.] OK, I'll contact Ms. Benoit to find out if she can meet later in the day, then.
Marcus Steuber [10:48 A.M.] That would work. I'm free between 4 and 6 P.M.`,
                questions: [
                    { id: '172', questionText: 'Why does Mr. Steuber write to Ms. Rajan?', options: { A: 'To invite her to a professional event', B: 'To check on the status of a meeting', C: 'To make travel plans for a business trip', D: "To ask about an assistant's performance" }, correctAnswer: 'B' },
                    { id: '173', questionText: 'At 10:45 A.M., what does Mr. Steuber most likely mean when he writes, "Let me check with my supervisor"?', options: { A: 'He needs final approval on a book design.', B: 'He would like advice on changing an appointment.', C: 'He requires access to the corporate calendar.', D: 'He is uncertain how to add team members to the chat.' }, correctAnswer: 'B' },
                    { id: '174', questionText: 'Who most likely is Ms. Benoit?', options: { A: 'A writer', B: 'A designer', C: 'A production editor', D: 'A printing plant supervisor' }, correctAnswer: 'A' },
                    { id: '175', questionText: 'What will Ms. Rajan probably do next?', options: { A: 'Suggest solutions to a printing issue', B: 'Arrange to visit the Singapore plant', C: 'Attend a meeting with Ms. Luong', D: 'Reschedule a video conference' }, correctAnswer: 'D' }
                ]
            },
            {
                id: 'passage-7-3-11',
                text: `Questions 176-180 refer to the following schedule and text message.

Rambling River Festival
Schedule of Musical Events
Friday, September 8
• 3:30 P.M. Johanna Greenblatt
• 8:00 P.M. Bethesda Radio Show featuring the Blass Brothers Band (to be recorded at the Bramley Theater)

Saturday, September 9
• 6:30 P.M. The Rolling Dozen
• 7:45 P.M. Jefferson Cage

All events take place at the Bethesda Park Open-Air Stage unless otherwise noted. Feel free to bring picnic blankets.

---

From Rambling River Festival, Sep 8, 9:14 A.M.
This afternoon's performance will take place in Cole Hall in anticipation of inclement weather. Bulky items are not allowed, but coat-check service will be available.
This evening's performance is being pushed to 2:30 P.M. tomorrow; local band Kirschau will perform during the original time slot instead.
We expect our full Saturday program to take place at the Bethesda Park Open-Air Stage.`,
                questions: [
                    { id: '176', questionText: 'Who was originally scheduled to perform at the Bramley Theater?', options: { A: 'Johanna Greenblatt', B: 'The Blass Brothers Band', C: 'The Rolling Dozen', D: 'Jefferson Cage' }, correctAnswer: 'B' },
                    { id: '177', questionText: 'What does the schedule suggest about the Rambling River Festival?', options: { A: 'It takes place annually.', B: 'It requires a ticket for entry.', C: 'It features local food vendors.', D: 'It is mainly an outdoor event.' }, correctAnswer: 'D' },
                    { id: '178', questionText: 'According to the text message, what can audience members do at Cole Hall?', options: { A: 'Check coats', B: 'Store bulky items', C: 'Buy concert tickets', D: 'Pick up a schedule of events' }, correctAnswer: 'A' },
                    { id: '179', questionText: 'In the text message, the word “pushed” in paragraph 2, line 1, is closest in meaning to', options: { A: 'moved', B: 'extended', C: 'managed', D: 'pressured' }, correctAnswer: 'A' },
                    { id: '180', questionText: 'When will Kirschau perform?', options: { A: 'At 3:30 P.M. on Friday', B: 'At 8:00 P.M. on Friday', C: 'At 2:30 P.M. on Saturday', D: 'At 6:30 P.M. on Saturday' }, correctAnswer: 'B' }
                ]
            },
            {
                id: 'passage-7-3-12',
                text: `Questions 181-185 refer to the following e-mail and article.

To: All Branch Managers
From: Fran Corliss
Subject: Survey results on mobile banking
Date: April 7

Hello all,
Ogden Bank recently conducted a survey of its customers concerning mobile banking. Here are some key takeaways.
Over 95 percent of our customers own a mobile device. However, although interest in mobile banking is high, only 39 percent of our customers use our application. Some customers cite security concerns (23 percent), but a majority (78 percent) say that they simply do not think the app works well.
A mandatory meeting for all branch managers will be held at our headquarters on April 12 at 4:00 P.M. to brainstorm strategies for responding to this challenge.

Best,
Fran Corliss
Director of Mobile Banking, Ogden Bank

---

Boost for Mobile Banking
By Edward Panzius
FLEMINGTON (May 25)—Ogden Bank has rolled out major improvements to its mobile banking application. It has expanded the variety of tasks that can be accomplished through the app and made it much easier to use.
"Many of our account holders have been frustrated in the past by a clunky, limited app," said Alys DeFreese, manager of the Flemington branch of Ogden Bank. "They can now do just about any task with the app that they could over the phone or by visiting a branch in person. This is just another example of how we support our customers in any way we can."
According to Ms. DeFreese, in the few weeks since the upgrade, 20 percent of account holders have switched to depositing checks and paying bills online. She anticipates that number will rise as more customers learn about the easy-to-use app.
"The convenience made a big difference for me," said account holder Yair Baum. Another customer, Maria Reed, added, “I appreciate the flexibility of being able to do my banking whenever and wherever I want."`,
                questions: [
                    { id: '181', questionText: 'What is one purpose of the e-mail?', options: { A: 'To provide details on a new privacy policy', B: 'To propose a survey of banking habits', C: 'To ask bank staff to test a mobile app', D: 'To inform managers of a company problem' }, correctAnswer: 'D' },
                    { id: '182', questionText: "According to the e-mail, what percentage of the bank's customers use the mobile app?", options: { A: '23 percent', B: '39 percent', C: '78 percent', D: '95 percent' }, correctAnswer: 'B' },
                    { id: '183', questionText: 'In the article, the word “anticipates” in paragraph 3, line 5, is closest in meaning to', options: { A: 'considers', B: 'waits for', C: 'prepares for', D: 'expects' }, correctAnswer: 'D' },
                    { id: '184', questionText: 'Who most likely attended a meeting at Ogden Bank headquarters on April 12?', options: { A: 'Mr. Panzius', B: 'Ms. DeFreese', C: 'Mr. Baum', D: 'Ms. Reed' }, correctAnswer: 'B' },
                    { id: '185', questionText: "What is suggested about Ogden Bank's management?", options: { A: 'It prefers that account holders do their banking in person.', B: 'It is considering offering free checking to new account holders.', C: 'It is in the process of hiring more staff.', D: 'It prioritizes improvements in customer experience.' }, correctAnswer: 'D' }
                ]
            },
            {
                id: 'passage-7-3-13',
                text: `Questions 186-190 refer to the following notice, Web page, and e-mail.

Attention, Library Members
The Westwood Library is excited to announce the start of a book club, which is open to all library members. The club will meet on the last Thursday of each month, from 7:00 to 9:00 P.M. in the Harrison Meeting Room, to discuss a book chosen by one of our professional staff. From January to June, we will read recently published nonfiction works, and from July to December, we will focus on contemporary fiction titles. For more information, visit www.westwoodlibrary.org or speak with the staff at the circulation desk.

---

https://www.westwoodlibrary.org/bookclub
We hope you will join us for the book club on the last Thursday of each month at 7:00 P.M.! Below are the titles selected for the first half of the year.
January: Wild Open Range by Jaxon McDonald
February: The Journey of a Song by Lucy Xi
March: Due North: Adventures in Alaska's Northern Territory by Isabel Beck
April: The Art of Mindful Carpentry by Peter Landers
May: Mary Swan: A Legend Before Her Time by Kai Noble
June: To Be Announced

---

To: Lisa Calle <lcalle@worldmail.com>
From: Gail Frey <gfrey@myemail.com>
Date: March 27
Subject: Book club

Dear Ms. Calle,
It was delightful to see you leading the book club yesterday evening. Ms. Beck's Due North is lengthy, and it was a challenge to finish it before the meeting. However, I have to thank you for choosing that book because it revived my childhood interest in traveling to Alaska. In fact, I've already looked up some tours!
The club meeting was packed, and I hardly got to talk to you. We should catch up sometime soon. Perhaps we might try the new French restaurant on Looper Street. I hear it is amazing and reasonably priced.

Sincerely,
Gail Frey`,
                questions: [
                    { id: '186', questionText: 'What is the purpose of the notice?', options: { A: 'To highlight some books in the library', B: 'To announce a change in library hours', C: 'To promote an activity at the library', D: 'To introduce a new librarian' }, correctAnswer: 'C' },
                    { id: '187', questionText: 'What is suggested about the book Wild Open Range?', options: { A: 'It is a best-selling title.', B: 'It is a work of nonfiction.', C: 'It was published ten years ago.', D: 'It is available at a discount for library members.' }, correctAnswer: 'B' },
                    { id: '188', questionText: 'What author most likely wrote about a famous person?', options: { A: 'Jaxon McDonald', B: 'Lucy Xi', C: 'Peter Landers', D: 'Kai Noble' }, correctAnswer: 'D' },
                    { id: '189', questionText: 'What can be concluded about Ms. Calle?', options: { A: 'She is a library staff member.', B: 'She has written book reviews.', C: "She is Ms. Frey's supervisor.", D: 'She favors historical fiction.' }, correctAnswer: 'A' },
                    { id: '190', questionText: 'What does Ms. Frey indicate about the book she read?', options: { A: 'It discussed a topic that was unfamiliar to her.', B: 'It had parts that she thought were inaccurate.', C: 'It was easy to read in the time available.', D: 'It inspired her to explore an old interest.' }, correctAnswer: 'D' }
                ]
            },
            {
                id: 'passage-7-3-14',
                text: `Questions 191-195 refer to the following e-mails and receipt.

From: Tatiana Schwartz <orders@georgestreetsweets.co.uk>
To: Alejandro Ordaz <aordaz@brooksidestationery.co.uk>
Date: 28 April
Subject: Confirmation of order number 47892
Attachment: Order receipt

Dear Mr. Ordaz,
Thank you for placing an order with George Street Sweets. This e-mail is to confirm that we have received your request. Your receipt has been attached to this e-mail.
If you have any questions or need to make any changes to your order, please reply to this message or phone us at (091) 498 0172. Note that we are unable to accommodate order changes that are submitted less than 48 hours before your scheduled pickup time.
If picking up your order, we are located at 29 George Street. Parking is available next door, directly behind Spike's Cycle Shop. We offer delivery to customers within 10 kilometres of our shop for a fee of £2.50. Please note that cancellations within 24 hours of your pickup or delivery time will not be refunded.

Sincerely,
Tatiana Schwartz

---

George Street Sweets
Order: 47892
Date of Order: 28 April
Pickup Date and Time: N/A
Delivery Date and Time: 2 May, 11:30 A.M.
Delivery Location: 2 Spen Lane, Business Suite 202
Payment Method: Credit Card—Alejandro Ordaz
Customisation Instructions: None

| Item | Cost |
|---|---|
| 18-inch round cake (chocolate with vanilla icing) | £32.00 |
| 1 set of candles | £5.00 |
| Delivery | £2.50 |
| **Total** | **£39.50** |

---

From: Alejandro Ordaz <aordaz@brooksidestationery.co.uk>
To: Tatiana Schwartz <orders@georgestreetsweets.co.uk>
Date: 29 April
Subject: RE: Confirmation of order number 47892

Dear Ms. Schwartz,
I received my order confirmation e-mail and receipt, and I noticed an error. It seems that the person to whom I spoke on the phone while placing my order did not copy down the message I requested. The customisation I specified was that “Happy Retirement" be written on top.
I hope it will still be possible to include this message despite the timing. Please respond to this e-mail to confirm. Also, there will be more guests than I originally expected, so I might contact your business again to place an additional order.

Best,
Alejandro Ordaz`,
                questions: [
                    { id: '191', questionText: 'What is a policy of George Street Sweets?', options: { A: 'Orders cannot be changed.', B: 'Orders placed less than 48 hours before pickup incur an extra fee.', C: 'Orders must be paid for when they are placed.', D: 'Orders cannot be refunded within 24 hours of pickup.' }, correctAnswer: 'D' },
                    { id: '192', questionText: 'What is suggested about the building at 2 Spen Lane?', options: { A: 'It has parking spaces behind a bicycle shop.', B: 'It is located within 10 kilometers of George Street Sweets.', C: 'It is a residential apartment building.', D: 'It is owned by Ms. Schwartz.' }, correctAnswer: 'B' },
                    { id: '193', questionText: 'What can be concluded about the cake?', options: { A: 'It has not been paid for yet.', B: 'It will have only chocolate icing.', C: 'It was ordered over the phone.', D: 'It contains ice cream.' }, correctAnswer: 'C' },
                    { id: '194', questionText: 'In the second e-mail, what does Mr. Ordaz request?', options: { A: 'A full refund', B: 'A different flavor', C: 'A response to an e-mail', D: 'An additional candle' }, correctAnswer: 'C' },
                    { id: '195', questionText: 'What does Mr. Ordaz mention about the event in his e-mail?', options: { A: 'It will take place on April 29.', B: 'It is an anniversary party.', C: 'Its start time has changed.', D: 'It will be larger than expected.' }, correctAnswer: 'D' }
                ]
            },
            {
                id: 'passage-7-3-15',
                text: `Questions 196-200 refer to the following e-mail, survey, and report.

To: Undisclosed Recipients
From: iqbal_grewal@woolfflooring.com.au
Date: 12 June
Subject: Cost-savings survey

Dear Colleagues,
At Woolf Flooring we are looking for ways to reduce day-to-day costs without sacrificing product quality, customer service, or staff morale. To this end, we are seeking input from select staff members in a variety of departments via an online survey that can be found at www.surveyquest.com.au/109820. Everyone who has been chosen to take part in the survey has been with the company for at least ten years and, therefore, is very familiar with our processes.
The deadline for completing the survey is 19 June. Note that this survey is for recipients of this e-mail only. Please do not forward this e-mail to others or post the link to the survey elsewhere.
We also plan to hire outside consultants to review our operations and write a report of their findings. We understand that some colleagues disagree with this approach to cutting costs; however, we have determined that getting an outside perspective is a worthwhile investment that will be likely to save us money in the long run.

Best,
Iqbal Grewal, Director of Business Transformation
Woolf Flooring

---

https://www.surveyquest.com.au/109820
Woolf Flooring Cost-Savings Survey
Based on your experience as an employee of Woolf Flooring, please provide one idea for a change that could be implemented to improve productivity and cut costs. Thank you.
Date: 18 June
Name and role: Beth Mair, sales manager
I have noticed that some employees grab a new pair of disposable gloves every time they return from a break. They could be using the same ones throughout the whole day. By limiting the use of gloves to one pair per day, Woolf Flooring would save thousands of dollars per year. Doing so would also reduce waste. A new policy regarding the use of personal protective items would be easy to implement immediately and would simply require sending a company-wide e-mail to explain it.

---

Miyoko Consulting
Woolf Flooring Report Summary
Thank you for allowing us to spend the last few weeks reviewing your operations. You will find a detailed expense-reduction report with projected savings in the pages that follow. Here is a list of our main recommendations.
1. Employees do not always use wood stains and other materials as efficiently as possible. More training time could be dedicated to this.
2. Employees could be more mindful of electricity costs—for instance, turning off all lights and machines when not in use.
3. Several Internet service providers are offering special pricing right now. Switching to one of these providers could save a considerable amount of money in the long run.
4. More effort could be made to reuse supplies—for example, some basic personal protective equipment could be used more than once.`,
                questions: [
                    { id: '196', questionText: 'In his e-mail, what does Mr. Grewal indicate about the survey?', options: { A: 'It does not have an end date.', B: 'It requires the use of a password.', C: 'It can be completed on paper.', D: 'It should not be shared with others.' }, correctAnswer: 'D' },
                    { id: '197', questionText: 'According to the e-mail, what do some Woolf Flooring employees disagree with?', options: { A: 'The plan to hire consultants', B: 'The way a survey is structured', C: 'The way a budget report is presented', D: 'The departments selected to provide feedback' }, correctAnswer: 'A' },
                    { id: '198', questionText: 'What can be concluded about Ms. Mair?', options: { A: 'She regularly provides ideas for change.', B: 'She has worked at Woolf Flooring for many years.', C: 'She will be helping to collect feedback.', D: 'She works in the production department.' }, correctAnswer: 'B' },
                    { id: '199', questionText: "In the survey, what does Ms. Mair note about her suggestion?", options: { A: 'It may require some new equipment.', B: 'It has worked well at other companies.', C: 'It could be implemented right away.', D: 'It has been suggested to management before.' }, correctAnswer: 'C' },
                    { id: '200', questionText: "What recommendation made by Miyoko Consulting corresponds with Ms. Mair's suggestion?", options: { A: 'Recommendation 1', B: 'Recommendation 2', C: 'Recommendation 3', D: 'Recommendation 4' }, correctAnswer: 'D' }
                ]
            }
        ]
    },
    4: { 
        id: 4, 
        title: 'Part 7 - Test 4', 
        part: 7, 
        passages: [
            {
                id: 'passage-7-4-1',
                text: `Zippy Petrol Mart
M64 Motorway
Leicester
0113 4960423
23 May
---
Biscuits £2.00
Fruit cup £0.95
Crisps £1.10
VAT Inclusive £0.81
Total £4.86
---
Sign up for our Zippy Club rewards card. You could have earned 4 Zippy Club points on this transaction. Points can be used for discounted merchandise, car products, phone accessories, and more!`,
                questions: [
                    { id: '147', questionText: 'What was purchased on May 23?', options: { A: 'Fuel', B: 'Snacks', C: 'Auto parts', D: 'Phone accessories' }, correctAnswer: 'B' },
                    { id: '148', questionText: 'What does the receipt indicate about Zippy Petrol Mart?', options: { A: 'It has multiple locations.', B: 'It accepts most major credit cards.', C: 'It has a customer rewards program.', D: 'It reduced the prices of all its merchandise.' }, correctAnswer: 'C' }
                ]
            },
            {
                id: 'passage-7-4-2',
                text: `Coming Soon: The Best of PBQ Radio
During the week of April 21-27, PBQ Radio will be hosting a best-of-the-decade program. The most popular tunes by recording artists from the past decade will be played all day long. Both well-known and lesser-known recording artists will be featured. We plan to showcase each artist's top works.
In addition to featuring the best music of the decade, we would like to highlight our region's businesses. Advertising time is available for purchase. Let our listeners know that your business is one of the best in the community! You can request a shout-out for your company from a program host, or our professional marketing team can write and record a 30-second advertisement.
Visit www.pbqradio.com/advertise for details and pricing.`,
                questions: [
                    { id: '149', questionText: 'For whom most likely was the notice written?', options: { A: 'Radio-show hosts', B: 'New recording artists', C: 'Business owners', D: 'Sound technicians' }, correctAnswer: 'C' },
                    { id: '150', questionText: 'What is true about PBQ Radio?', options: { A: 'It has been in business for ten years.', B: 'It is looking for experienced musicians.', C: 'It was voted the best station in the community.', D: 'It has its own marketing department.' }, correctAnswer: 'D' }
                ]
            },
            {
                id: 'passage-7-4-3',
                text: `Frank Jabati [11:12 A.M.]: Hi, Maxine. I'm running late with this delivery today. Could you contact Ms. Dibello to let her know?
Maxine Larsen [11:13 A.M.]: Sure! I know that she is eager to get those new items. She says she needs to set up her kitchen properly so that she can prepare a special meal tonight. What time do you think you will arrive there?
Frank Jabati [11:15 A.M.]: I'm not sure—the road I was taking was closed for repairs. The detour road has heavy traffic.
Maxine Larsen [11:17 A.M.]: Sorry to hear that. What's your estimate?
Frank Jabati [11:19 A.M.]: Maybe around 1 P.M.
Maxine Larsen [11:20 A.M.]: OK, great. I will get in touch with Ms. Dibello to confirm that she will be home at that time. Then I'll get back to you.
Frank Jabati [11:22 A.M.]: Thanks!`,
                questions: [
                    { id: '151', questionText: 'What most likely has Ms. Dibello purchased?', options: { A: 'Linens', B: 'Bookshelves', C: 'Gardening tools', D: 'Appliances' }, correctAnswer: 'D' },
                    { id: '152', questionText: 'At 11:17 A.M., what does Ms. Larsen most likely mean when she writes, "What\'s your estimate"?', options: { A: 'She must verify the distance of a route.', B: 'She wants to know how much traffic there is.', C: 'She wants to know a delivery time.', D: 'She has to calculate a delivery charge.' }, correctAnswer: 'C' }
                ]
            },
            {
                id: 'passage-7-4-4',
                text: `To: Janet Hubschmann
From: customerservice@readymadeofficesupplies.net
Date: September 3
Subject: Thank you

Dear Ms. Hubschmann,
We here at Readymade Office Supplies are excited to welcome you to our Customers Count rewards program. Your account number 41120 is now registered.
Be sure to enter your account number to earn points on all your purchases from our Web site. You will earn one point for every dollar you spend on qualifying purchases. Redeem your points on your account page for rewards, including free two-day expedited shipping, special discounts, and more. You can still order via mail from our print catalog, over the telephone from one of our helpful representatives, or by visiting our retail locations across the United States and Canada. However, those purchases do not currently qualify for the rewards program.
Have questions? Please visit https://www.readymadeofficesupplies.net/customerservice.`,
                questions: [
                    { id: '153', questionText: 'What types of purchases earn reward points?', options: { A: 'Those made online', B: 'Those made by mail', C: 'Those made by phone', D: 'Those made in a store' }, correctAnswer: 'A' },
                    { id: '154', questionText: 'What is a benefit of the program?', options: { A: 'Invitations to retail events', B: 'Free samples', C: 'Faster shipping', D: 'Extended product warranties' }, correctAnswer: 'C' }
                ]
            },
            {
                id: 'passage-7-4-5',
                text: `Native Plant Society Headquarters
161 Sussex Street
Sydney, NSW 2001
15 April

Yasmine Harabi
247 Kooljak Road
Perth, Western Australia 6280
Membership number 4290

Dear Ms. Harabi,
Thank you for your continued support as a society member. Given your recent move, your membership has been transferred to the chapter located in the city of Perth. We will be mailing a replacement member identification card within a few days.
Unlike the chapter in the city of Canberra, the Perth branch meets the first Saturday of every month, so your next meeting will be in three weeks. If you have any questions, please contact us weekdays between 8:00 a.m. and 4:00 p.m. at (08) 5555 0145.

Sincerely,
Leticia Davis
Membership Department`,
                questions: [
                    { id: '155', questionText: 'What is the purpose of the letter?', options: { A: 'To announce a special event', B: 'To explain changes based on a relocation', C: 'To propose a new meeting time', D: 'To request updated contact information' }, correctAnswer: 'B' },
                    { id: '156', questionText: 'What is suggested about the city of Canberra?', options: { A: 'It is famous for its many gardens.', B: "It houses the headquarters of Ms. Davis' organization.", C: 'It is where Ms. Harabi previously lived.', D: "It is home to some of Australia's rarest plants." }, correctAnswer: 'C' },
                    { id: '157', questionText: 'What can be concluded about the Native Plant Society?', options: { A: 'It is under new leadership.', B: 'Its membership is growing.', C: 'It is raising membership dues.', D: 'Its chapters hold monthly meetings.' }, correctAnswer: 'D' }
                ]
            },
            {
                id: 'passage-7-4-6',
                text: `https://www.greenroofplus.com
Basics | Photos | Resources | News

What Are Green Roofs?
Green roofs are an energy-saving option for office buildings and homes. A green roof is one that's covered with grasses, flowers, or other plants. It lowers heating and cooling costs while increasing a structure's aesthetic appeal. This Web site is designed for sharing ideas, photos, and resources to create and maintain a green roof.
Planting a rooftop garden is a rewarding do-it-yourself project, but special waterproofing and other preparations require the services of an experienced contractor. Costs vary widely by region, roof size, and complexity of the garden you want to create. Be sure to get estimates from at least two contractors.
If your contractor determines that your roof can handle the extra weight of soil, plants, and irrigation, ask about the project's timeline. Small, simple rooftop gardens may take only one week to complete.`,
                questions: [
                    { id: '158', questionText: 'According to the Web page, what can visitors to the Web site do?', options: { A: 'Discuss how to create a garden', B: 'Learn how to maximize vegetable production', C: 'Seek advice about landscaping problems', D: 'Help contractors calculate costs' }, correctAnswer: 'A' },
                    { id: '159', questionText: 'What is NOT mentioned about green roofs?', options: { A: 'They decrease energy bills.', B: 'They remove pollution from the air.', C: 'They make a structure more beautiful.', D: 'They can be installed on commercial and residential buildings.' }, correctAnswer: 'B' },
                    { id: '160', questionText: 'In paragraph 3, line 1, the word "handle" is closest in meaning to', options: { A: 'touch', B: 'control', C: 'deliver', D: 'support' }, correctAnswer: 'D' }
                ]
            },
            {
                id: 'passage-7-4-7',
                text: `Martino Technical has been providing live sound-mixing services for more than 30 years. We use the latest technology to produce the best sound.
The majority of our clients are heavy-metal and classic-rock musicians. Before they go on tour, we rehearse with them to ensure that the sounds are perfectly blended and balanced. In addition, we create recordings for them that they can post on social media to promote their shows.
Our sound-mixing engineers are known for their experience and professionalism and have an impressive track record working on tours worldwide. They have worked with many popular music groups, including The Peakes, Firebrand, and Cellar Cats, and make bands sound just as good during live performances as they do on their records.
Contact us by e-mailing information@martinotechnical.ie.`,
                questions: [
                    { id: '161', questionText: 'What is indicated about Martino Technical?', options: { A: 'It acquires most clients through social media.', B: 'It was founded over 30 years ago.', C: 'It has received many industry awards.', D: 'It has offices throughout the world.' }, correctAnswer: 'B' },
                    { id: '162', questionText: 'The word “promote” in paragraph 2, line 4, is closest in meaning to', options: { A: 'encourage', B: 'schedule', C: 'publicize', D: 'advance' }, correctAnswer: 'C' },
                    { id: '163', questionText: 'What is NOT stated about the live sound-mixing engineers?', options: { A: 'They create promotional materials.', B: 'They have considerable expertise.', C: 'They travel abroad frequently.', D: 'They have degrees in music.' }, correctAnswer: 'D' }
                ]
            },
            {
                id: 'passage-7-4-8',
                text: `To: Employees <employees@bonahoomenterprises.com>
From: Marcia Noh <mnoh@bonahoomenterprises.com>
Date: November 14
Subject: November 28 event

Dear all,
On the evening of November 28, there will be a formal dinner to honor our company president and founder, Mr. Bonahoom. At the dinner, we will express our appreciation for his leadership over these past twenty years in making Bonahoom Enterprises a successful company and a great place to work. — [1] —.
This event will be held in the private banquet room at Chez Bistro and is intended to be a surprise, so please avoid mentioning it to him. Those few who are involved with the setup will arrive at 5 P.M. All other attendees should come no later than 6:15 P.M. in anticipation of Mr. Bonahoom's arrival at 6:30 P.M. We expect the celebration to wrap up no later than 8 P.M. — [2] —.
There is no need to bring a gift. — [3] —. We do ask, though, that you find time this week to sign a card for him. It can be found at Ms. Mueller's desk, inside an envelope marked "November 28."
Finally, you are welcome to bring one guest with you to the event if you wish. — [4] —. Kindly RSVP to this e-mail so we can get a complete count of the number of attendees.

All the best,
Marcia Noh`,
                questions: [
                    { id: '164', questionText: 'What is the main purpose of the e-mail?', options: { A: 'To ask staff to sign up to give speeches at a celebration', B: 'To find people willing to bring various items to a dinner', C: 'To invite workers to a surprise party', D: 'To look for volunteers to help plan an event' }, correctAnswer: 'C' },
                    { id: '165', questionText: 'According to the e-mail, when are most people expected to arrive?', options: { A: 'At 5:00 P.M.', B: 'At 6:15 P.M.', C: 'At 6:30 P.M.', D: 'At 8:00 P.M.' }, correctAnswer: 'B' },
                    { id: '166', questionText: 'What should people do if they want to sign a card?', options: { A: 'They should request it from Mr. Bonahoom.', B: 'They should e-mail Ms. Noh.', C: 'They should wait for it to be passed around the office.', D: "They should go to Ms. Mueller's desk." }, correctAnswer: 'D' },
                    { id: '167', questionText: 'In which of the positions marked [1], [2], [3], and [4] does the following sentence best belong?\n"The senior staff will be presenting a commemorative plaque on behalf of the whole office."', options: { A: '[1]', B: '[2]', C: '[3]', D: '[4]' }, correctAnswer: 'B' }
                ]
            },
            {
                id: 'passage-7-4-9',
                text: `Colin Wikander (10:23 A.M.) I have reviewed the draft of the new client questionnaire, and it looks great overall. I would make the question about bookkeeping strategies more open-ended, though. As written, it may lead respondents to give simple yes or no answers.
Midori Sakai (10:24 A.M.) That's a good point. We'll need to fix that. I also want to add a couple of questions about how financial and tax reports have been handled in the past.
Ela Hamidah (10:24 A.M.) I could look at the bookkeeping question to see what I can come up with.
Colin Wikander (10:25 A.M.) Well, it's four pages already.
Midori Sakai (10:27 A.M.) That's true. I'll just wait for Ela's revision of the third question. Then Jack Neligan can put a draft of the form up on our Web site.
Colin Wikander (10:28 A.M.) Is it true that we are not planning to collect any paper forms?
Midori Sakai (10:30 A.M.) We might do that, but digital collection is preferable to avoid the lag time of waiting for our clients to print, fill out, and scan the forms to send them back.`,
                questions: [
                    { id: '168', questionText: 'What type of company do the writers most likely work for?', options: { A: 'Publishing', B: 'Accounting', C: 'Retail', D: 'Design' }, correctAnswer: 'B' },
                    { id: '169', questionText: 'What does Mr. Wikander suggest about a question?', options: { A: 'It is mislabeled.', B: 'It is difficult to read.', C: 'It should be reworded.', D: 'It should be made optional.' }, correctAnswer: 'C' },
                    { id: '170', questionText: 'At 10:25 A.M., what does Mr. Wikander most likely mean when he writes, "Well, it\'s four pages already"?', options: { A: 'He is surprised by the long answers clients gave.', B: 'He is impressed with how quickly the questionnaire is coming along.', C: 'He thinks information in the first four pages should be cut out.', D: 'He thinks the questionnaire should not be any longer.' }, correctAnswer: 'D' },
                    { id: '171', questionText: 'Why does Ms. Sakai think that paperless forms will be preferable?', options: { A: 'They allow for faster data collection.', B: 'They reduce the number of errors.', C: 'They are good for the environment.', D: 'They do not take up space in an office.' }, correctAnswer: 'A' }
                ]
            },
            {
                id: 'passage-7-4-10',
                text: `https://www.trehospitalityassociation.com/discussion/tunisia
I have been a member of the TRE Hospitality Association for many years, but until now, I have posted messages only on the Greece and Egypt forums. — [1] —. This is my first post on the Tunisia forum.
I am looking for recommendations for a janitorial service on the island of Djerba. My company is opening a hotel there. Our hotel will offer 80 rooms with two restaurants on-site. — [2] —. I would like to contract with a company that can provide about four full-time custodial workers and housekeepers, plus an additional five workers on an as-needed basis for large events on our property. — [3] —.
I may have met some of you previously at one of our hospitality conferences. If so, please remind me. In fact, I attended the most recent one in Rabat. — [4] —. I would like to reconnect!
John Karikas, Director of Development
Synecdoche Hotel Group`,
                questions: [
                    { id: '172', questionText: 'Why did Mr. Karikas write the post?', options: { A: 'To promote a job fair', B: 'To request referrals to a service provider', C: 'To recommend a tourist destination', D: 'To invite colleagues to a grand opening' }, correctAnswer: 'B' },
                    { id: '173', questionText: 'What is suggested about the TRE Hospitality Association?', options: { A: 'It is based in Egypt.', B: 'It was recently expanded to include hotel owners.', C: 'It is an international organization.', D: 'It offers janitorial services.' }, correctAnswer: 'C' },
                    { id: '174', questionText: 'What is indicated about Mr. Karikas?', options: { A: 'He teaches a hospitality course.', B: 'He lives in Rabat.', C: 'He is a former restaurant owner.', D: 'He attended at least one hospitality conference.' }, correctAnswer: 'D' },
                    { id: '175', questionText: 'In which of the positions marked [1], [2], [3], and [4] does the following sentence best belong?\n"It will also have a large meeting room."', options: { A: '[1]', B: '[2]', C: '[3]', D: '[4]' }, correctAnswer: 'B' }
                ]
            },
            {
                id: 'passage-7-4-11',
                text: `To: Manuel Torres <m.torres@opalmail.co.uk>
From: Anya Patel <a.patel@support.harlund.co.uk>
Date: 3 May
Subject: Auto insurance
Dear Mr. Torres,
Welcome to Harlund Ltd. We are pleased to provide you with comprehensive automobile insurance for your new vehicle. We have received your first payment of £36.00, and your coverage is now in effect. Your policy number is M413927.
Your billing schedule is based on an annual premium of £432.00. The remaining payments of £36.00 per month are due on the fifteenth day of each month starting in June.
You can visit us online at www.harlund.co.uk to pay bills and manage your policy. Our Web site offers easy options for managing your account information and for making payments with scheduled transfers directly from your bank.
Should you have any questions or wish to change your policy, call the customer support centre at 020 7946 0516. In the event of a vehicle incident, please contact an agent as soon as possible at 020 7946 0520. Be sure to have your policy number at hand. Thank you for trusting Harlund Ltd. We look forward to providing you with superior service.
Best regards,
Anya Patel, Harlund Ltd. Customer Support Agent
---
*E-mail*
To: Anya Patel <a.patel@support.harlund.co.uk>
From: Manuel Torres <m.torres@opalmail.co.uk>
Date: 4 May
Subject: RE: Auto insurance
Dear Ms. Patel,
Thank you for the confirmation. I'm happy to have insurance from a trustworthy company. For your reference, the new car is now registered in my name.
Although I made the initial payment to you by credit card, I plan to follow the process outlined in your e-mail for future payments.
I also wanted to let you know that I have not yet received the insurance certificate. I looked for one that I could download from your Web site, but I could not find anything. Could you please send me a copy of the certificate?
Sincerely,
Manuel Torres`,
                questions: [
                    { id: '176', questionText: 'What can be inferred about Mr. Torres?', options: { A: 'He is moving to a new home.', B: 'He recently bought a car.', C: 'He will be retiring soon.', D: 'He recently opened a bank account.' }, correctAnswer: 'B' },
                    { id: '177', questionText: 'In the first e-mail, the word “coverage" in paragraph 1, line 3, is closest in meaning to', options: { A: 'measurement', B: 'information', C: 'commentary', D: 'protection' }, correctAnswer: 'D' },
                    { id: '178', questionText: 'What does Ms. Patel recommend that Mr. Torres do?', options: { A: 'Call an agent if needed', B: 'Register at a local office', C: 'Place an order promptly', D: 'Revise an agreement' }, correctAnswer: 'A' },
                    { id: '179', questionText: 'How does Mr. Torres intend to make future payments?', options: { A: 'By cash', B: 'By credit card', C: 'By electronic transfer', D: 'By personal check' }, correctAnswer: 'C' },
                    { id: '180', questionText: 'What does Mr. Torres state that he looked for?', options: { A: 'Directions to an office', B: 'A document to download', C: 'Reviews from customers', D: 'Contact information' }, correctAnswer: 'B' }
                ]
            },
            {
                id: 'passage-7-4-12',
                text: `Tour Schedule for Book Launch by Andrew Darr
At each appearance, Mr. Darr will read an excerpt from his new novel, Down the Mountainside, followed by a question-and-answer session. Afterward, Mr. Darr will be available to autograph copies of his books.
| Venue | City | Date | Time |
|---|---|---|---|
| Neighbourhood Books | Toronto, Ontario | 18 May | 6:00 P.M. |
| Weinstock Books and Stationery | Ottawa, Ontario | 27 May | 7:00 P.M. |
| Portage Avenue Books | Winnipeg, Manitoba | 6 June | 6:30 P.M. |
| Downtown Books and Café | Regina, Saskatchewan | 15 June | 7:00 P.M. |
---
Book Review: Down the Mountainside
Reviewer: Camile Lin
Date: 15 May
Andrew Darr, the author of the best-selling series about detective Charles Martin, will be visiting our city this week, appearing at Neighbourhood Books to promote his new novel, Down the Mountainside. The new work sees Martin investigating mysterious events at a ski resort in the French Alps.
Darr's storytelling has come a long way since readers first met Charles Martin in The Doorbell, and this installment is Darr's strongest work to date. Fans of the stories will welcome the return of Darr's wit after a three-year wait, and newcomers to the Martin series are sure to find themselves captivated.
The story includes the right balance of suspense and humour, with an ending that is unpredictable, even to the most devoted Darr reader. I highly recommend this book to all mystery fans. You won't be disappointed.`,
                questions: [
                    { id: '181', questionText: 'According to the schedule, what is NOT mentioned as an activity for Mr. Darr?', options: { A: 'Reading from his book', B: 'Answering questions', C: 'Signing books for individuals', D: 'Taking photos with participants' }, correctAnswer: 'D' },
                    { id: '182', questionText: 'What city is the book reviewer from?', options: { A: 'Toronto', B: 'Ottawa', C: 'Winnipeg', D: 'Regina' }, correctAnswer: 'A' },
                    { id: '183', questionText: 'What is most likely true about Down the Mountainside?', options: { A: "It is the author's first book.", B: 'It is a collection of short stories.', C: 'It is part of a series.', D: 'It is being translated into French.' }, correctAnswer: 'C' },
                    { id: '184', questionText: 'Who is Mr. Martin?', options: { A: "A fan of the author's", B: 'A character in the book', C: 'The writer of the review', D: 'The owner of a bookstore' }, correctAnswer: 'B' },
                    { id: '185', questionText: 'According to the review, who would most likely read Down the Mountainside?', options: { A: 'People who like to read mysteries', B: 'People who enjoy novels based on true stories', C: 'People who travel frequently', D: 'People who prefer science fiction' }, correctAnswer: 'A' }
                ]
            },
            {
                id: 'passage-7-4-13',
                text: `Annual Citrus Production in Yuma County
- 82 tons of citrus fruit
- Over 120,000 boxes of lemons
- 15,000 boxes of oranges
- 9,000 boxes of grapefruit
- $190 million in revenue
Employing close to 3,000 workers and contributing nearly $2 million in taxes to fund public services for the county
-Arizona Agriculture Division
---
City West Bank
455 Canyon Avenue
Phoenix, Arizona 85007
March 21
Domingo Ramirez, Director
Arizona Agriculture Division
55 Sixth Avenue
Yuma, Arizona 85364
Dear Mr. Ramirez,
I read the recent report from the Arizona Agriculture Division summarizing Yuma County's success in the citrus industry. City West Bank wants to help the Arizona Agriculture Division you lead by expanding this industry further. We offer low-interest loans and provide expert advice through our connections to area chambers of commerce and to agricultural researchers at Arizona's state universities.
We recognize that agritourism in southwest Arizona is growing as a result of the popularity of farm tours, bird-watching, and scenic country lodging, but tourism is unlikely to surpass the strength of this region's agriculture production. We support farmers in many counties in Arizona and are poised to help the citrus growers in Yuma County. Together, we can accomplish great things.
Cordially,
Bianca Schreiber
Industry Investment Programs
---
Schreiber Named Vice President of National Investment Strategies
PHOENIX (January 19)—City West Bank announced today that Ms. Bianca Schreiber will be promoted to vice president of National Investment Strategies effective February 1. Ms. Schreiber currently oversees City West Bank's Industry Investment Programs, serving businesses throughout Arizona.
Bank President William Dolle cited Ms. Schreiber's record of successful investment in the agricultural sector. "Ms. Schreiber's efforts in working with the director of the Arizona Agriculture Division have significantly boosted citrus production. Yuma County now produces as many grapefruit as it does oranges. Ms. Schreiber's keen insight will make her even more valuable to us in her new role," remarked Mr. Dolle.`,
                questions: [
                    { id: '186', questionText: 'What does the report indicate about the Yuma County region?', options: { A: 'It does not tax fruit that is sold there.', B: 'Several types of fruit are cultivated there.', C: 'More workers are needed for agricultural jobs.', D: 'New types of fruit are being produced there.' }, correctAnswer: 'B' },
                    { id: '187', questionText: 'What is one reason Ms. Schreiber writes to Mr. Ramirez?', options: { A: 'To explain the benefits of doing business together', B: 'To clarify information in the report', C: 'To remind him to make a loan payment', D: 'To offer him advice from university agricultural researchers' }, correctAnswer: 'A' },
                    { id: '188', questionText: 'According to the letter, why do tourists visit Yuma County?', options: { A: 'To shop at farmers markets', B: 'To take pictures', C: 'To enjoy theme parks', D: 'To observe wildlife' }, correctAnswer: 'D' },
                    { id: '189', questionText: 'What is suggested about Mr. Ramirez?', options: { A: "He accepted Ms. Schreiber's proposal.", B: 'He used to be employed by City West Bank.', C: 'He is a member of the Yuma Chamber of Commerce.', D: 'He recently bought a citrus farm.' }, correctAnswer: 'A' },
                    { id: '190', questionText: 'For what accomplishment does Mr. Dolle praise Ms. Schreiber?', options: { A: 'Arranging the shipping of agricultural products', B: 'Opening many City West Bank branch offices', C: 'Helping to increase grapefruit production to 15,000 boxes', D: 'Promoting Yuma County as a vacation destination' }, correctAnswer: 'C' }
                ]
            },
            {
                id: 'passage-7-4-14',
                text: `https://www.unetcon.org/messages_audreysmith80
Unetcon - Message Center
Pending Invitations
From: Don Fitzpatrick
Branch Manager, Wilsonville Financial
To: Audrey Smith
Dear Audrey,
Please accept this invitation to connect professionally on Unetcon. I am a fellow Stonerook University graduate and am always looking to expand my network. In this case, I am also reaching out to see if you would be interested in joining the private Stonerook alumni group page to stay current with everything that our fellow graduates are up to. https://www.unetcon.org/private/stonerookugrads.
Kind regards,
Don Fitzpatrick
---
https://www.unetcon.org/private/stonerookugrads
Stonerook University Graduates
Check out the continued success and latest updates from Stonerook graduate Jonah Hilliard.
Current: Director, Albright School of Business; Founder and Director, Clear Path
Education: Master of Business Administration - Turnbull University; Bachelor of Arts in Education Studies - Stonerook University
Professional: Mr. Hilliard has led the Albright School of Business since 2017. Between 2007 and 2017, he carried out extensive research on emerging markets in West Africa while teaching business management in Lagos, Nigeria. Two years ago, he founded Clear Path, a business that advises students from around the globe who wish to pursue studies in the United States.
Contact: Phone: 843-555-0139; E-mail: jhilliard@mccleese.edu; Office: 403 Cordon Hall, 530 N Kensington St, Charleston, SC 29425
---
*E-mail*
From: Audrey Smith <audrey_smith80@rapidonet.co.uk>
To: Jonah Hilliard <jhilliard@mccleese.edu>
Date: 19 September
Subject: Referral
Dear Jonah,
It has been a long time since we last talked. I recently came across your profile on Unetcon and saw that you are now leading the business school at McCleese! My research in Lagos ended last year, when I accepted a position as lead consultant at Pryor and Martell. I have been based here in Manchester ever since.
Congratulations to you on your most recent business venture—Clear Path already has quite an impressive reputation! I have a nephew who is interested in pursuing a degree in management information systems in the United States, and I was hoping I could put you both in touch so that he can take advantage of your new company's expertise in this area.
Best,
Audrey Smith`,
                questions: [
                    { id: '191', questionText: 'What does the invitation indicate about Unetcon?', options: { A: 'It is a business consulting firm.', B: 'It is a financial services company.', C: 'It is an employment agency.', D: 'It is a professional networking Web site.' }, correctAnswer: 'D' },
                    { id: '192', questionText: 'According to the Web page, where is Mr. Hilliard currently working?', options: { A: 'In Lagos', B: 'In Charleston', C: 'In Wilsonville', D: 'In Manchester' }, correctAnswer: 'B' },
                    { id: '193', questionText: 'What is suggested about Ms. Smith?', options: { A: 'She taught at Stonerook University.', B: 'She works at Wilsonville Financial.', C: "She accepted Mr. Fitzpatrick's invitation.", D: 'She plans to visit Lagos this year.' }, correctAnswer: 'D' },
                    { id: '194', questionText: 'What do Ms. Smith and Mr. Hilliard have in common?', options: { A: 'They cofounded Clear Path.', B: 'They are colleagues at Pryor and Martell.', C: 'They were classmates at Turnbull University.', D: 'They both conducted research in Nigeria.' }, correctAnswer: 'D' },
                    { id: '195', questionText: "What is one purpose of Ms. Smith's e-mail to Mr. Hilliard?", options: { A: 'To request his professional services', B: 'To provide a professional reference', C: 'To conduct an informational interview', D: 'To apply for a position at Albright School of Business' }, correctAnswer: 'A' }
                ]
            },
            {
                id: 'passage-7-4-15',
                text: `Modern Salon Academy
www.modernsalonacademy.ca
Established more than twenty years ago, Modern Salon Academy is Toronto's most recognized beauty school. The school offers hands-on training, small class sizes, and individualized instruction from leading industry professionals in the following programs.
- Cosmetology I: Gain foundational knowledge of haircutting and styling.
- Cosmetology II: Learn techniques in haircutting, styling, and colouring.
- Skin Care: Learn techniques in providing advanced skin-care treatments.
- Leadership: Study salon management, business operations, and compliance.
Modern Salon Academy is a winner of the International Cosmetology Society's prestigious Award of Excellence. It is no surprise, then, that over 95 percent of our graduates have gone on to successful careers in both the beauty and fashion industries.
---
Modern Salon Academy Expands in Ontario
TORONTO (23 August)—Modern Salon Academy, a highly regarded beauty school here in Toronto, is opening a regional campus in Oshawa. The school is already admitting students for classes that are scheduled to begin on 4 October.
Modern Salon Academy has had a substantial rise in enrollment over the past few years. Francine Dupuis, educational director of Modern Salon Academy, notes, "More than half our students live outside the city limits, so having a satellite campus makes perfect sense."
Modern Salon Academy offers professional training and certification for careers in a variety of areas, including hair care, skin care, and makeup. For more information about Modern Salon Academy, including admission requirements, fees, and academic calendars, visit www.modernsalonacademy.ca.
-Chrissy Jellen for the Ontario Daily Times
---
To: Francine Dupuis <francine.dupuis@modernsalonacademy.ca>
From: Amit Persaud <amit@shorelinebarbers.ca>
Subject: Entry-level job opportunities
Date: 19 November
Dear Ms. Dupuis,
My name is Amit Persaud, and I am the owner and operator of Shoreline Barbers. I am interested in recruiting some of your graduating students to work at my barbershop, which is just around the corner from your newly established regional campus. I am seeking highly qualified, entry-level employees who can provide both haircutting and hair-colouring services.
Would it be possible for me to visit the nearby campus to give interested students an opportunity to talk with me? This would be a convenient way for me to evaluate them for the positions I am seeking to fill, and then I can also answer any questions they may have. Please let me know if an arrangement can be made.
Sincerely,
Amit Persaud`,
                questions: [
                    { id: '196', questionText: 'How does Modern Salon Academy teach its students?', options: { A: 'Through online courses', B: 'Through academic lectures', C: 'Through individualized training', D: 'Through large-group discussions' }, correctAnswer: 'C' },
                    { id: '197', questionText: 'According to the article, what has increased at Modern Salon Academy?', options: { A: 'The cost of tuition', B: 'The number of students', C: 'The requirements for admission', D: 'The hours needed for certification' }, correctAnswer: 'B' },
                    { id: '198', questionText: 'What is most likely true about Shoreline Barbers?', options: { A: 'It is located in Oshawa.', B: 'It is opening a shop in Toronto.', C: 'It was sold to Francine Dupuis.', D: 'It has very affordable services.' }, correctAnswer: 'A' },
                    { id: '199', questionText: "Who would best meet Mr. Persaud's needs?", options: { A: 'Students in Cosmetology I', B: 'Students in Cosmetology II', C: 'Students in Skin Care', D: 'Students in Leadership' }, correctAnswer: 'B' },
                    { id: '200', questionText: 'According to the e-mail, what does Mr. Persaud want to do?', options: { A: 'Establish another business', B: 'Retrain staff members', C: 'Teach some classes', D: 'Interview some students' }, correctAnswer: 'D' }
                ]
            }
        ] 
    },
    5: { 
        id: 5, 
        title: 'Part 7 - Test 5', 
        part: 7, 
        passages: [
            {
                id: 'passage-7-5-1',
                text: `Owl and Moon
Buy one mattress, and choose one of our beautiful rugs for free!
Use the following coupon code when you check out at owlandmoon.co.uk: ESSZRS4T.
Our mattresses are shipped directly to your home and usually arrive within one week. Try out a mattress for 90 days, and if you are not happy with it, send it back for a full refund. We also offer low-interest financing for two years on all our furniture.`,
                questions: [
                    { id: '147', questionText: 'What types of products are being advertised?', options: { A: 'Camping gear', B: 'Household items', C: 'Office equipment', D: 'Automobile accessories' }, correctAnswer: 'B' },
                    { id: '148', questionText: 'What is indicated about the company?', options: { A: 'It has been in business for two years.', B: 'It accepts product returns.', C: 'It has same-day delivery.', D: 'It has a yearly sale.' }, correctAnswer: 'B' }
                ]
            },
            {
                id: 'passage-7-5-2',
                text: `*E-mail*
To: Demarco Hines <d.hines@worldmail.com>
From: Soon Yi Park <customerservice@thebestbags.co.kr>
Subject: Item F208 (canvas overnight bag)
Date: 19 June
Dear Mr. Hines,
The Best Bags canvas overnight bag you ordered is not currently available in the colour you requested. There are several options available to you.
1. Cancel your order, and we will gladly refund your money in full.
2. Select a different colour. That item is currently available in light blue, dark green, and dark gray.
3. Choose an item of equal value from our Web site or catalogue.
4. Wait until the item you ordered is back in stock in light gray. Allow three to five weeks.
Please let us know which option you prefer. We apologize for any inconvenience.
Thank you,
Soon Yi Park, Customer Service Agent`,
                questions: [
                    { id: '149', questionText: 'What is the purpose of the e-mail?', options: { A: 'To confirm shipment of an order', B: 'To acknowledge the return of an order', C: 'To provide alternatives for an order', D: 'To thank a customer for placing an order' }, correctAnswer: 'C' },
                    { id: '150', questionText: 'What color bag is currently NOT available?', options: { A: 'The light blue one', B: 'The dark green one', C: 'The dark gray one', D: 'The light gray one' }, correctAnswer: 'D' }
                ]
            },
            {
                id: 'passage-7-5-3',
                text: `Christie Moroff (9:47 A.M.)
Good morning, Ren. I just stopped by your office.
Ren Nomura (9:48 A.M.)
Then you already know that I am not there today.
Christie Moroff (9:48 A.M.)
Yes, your new office mate—I can't remember her name—told me that you just started working remotely on Tuesdays. I was looking for some empty binders.
Ren Nomura (9:49 A.M.)
That's Cheryl. I thought you had already met her. Are there any binders in the supply closet?
Christie Moroff (9:50 A.M.)
No, I just looked. Frank has ordered some more, but they won't be in until next week. I need two or three of them now.
Ren Nomura (9:51 A.M.)
Check with Cheryl. She is really helpful.
Christie Moroff (9:52 A.M.)
OK. I will.`,
                questions: [
                    { id: '151', questionText: 'What is suggested about Mr. Nomura?', options: { A: 'He does not usually work on Tuesdays.', B: 'He shares an office with Ms. Moroff.', C: 'He recently purchased office supplies.', D: 'He works off-site one day a week.' }, correctAnswer: 'D' },
                    { id: '152', questionText: 'At 9:51 A.M., what does Mr. Nomura most likely mean when he writes, "Check with Cheryl"?', options: { A: 'Cheryl may have extra binders.', B: 'Cheryl must approve a purchase.', C: 'Cheryl will be able to locate Frank.', D: 'Cheryl knows when a delivery will arrive.' }, correctAnswer: 'A' }
                ]
            },
            {
                id: 'passage-7-5-4',
                text: `Cortica Bank
Please fill out the following form to open a new bank account.
Is this your first account with Cortica Bank? __ Yes X No
Existing account number (if applicable): 190-37580
New account type: _ Chequing X Savings _ Investment
Name: Frances Wilkes
Mailing address: 17 Jones Street, North Sydney NSW 2060
Phone number: (02) 7010 8624
E-mail address: fwilkes@myemail.com.au
Initial deposit amount (minimum $500): $1,500
Would you like to sign up for electronic communications? __ Yes X No
If you select "Yes," we will contact you via voice mail, e-mail, or text.
If you select "No," you will receive monthly paper statements in the mail.
Please note that accounts take up to two business days to be established. Your funds will be available after this period. You will receive your debit card in the mail in up to five business days.`,
                questions: [
                    { id: '153', questionText: 'What is indicated about Ms. Wilkes?', options: { A: 'She has another account with Cortica Bank.', B: 'She plans to open an investment account.', C: 'She has lost a debit card.', D: 'She placed an order for checks.' }, correctAnswer: 'A' },
                    { id: '154', questionText: 'How will the bank most likely contact Ms. Wilkes?', options: { A: 'By e-mail', B: 'By text message', C: 'By telephone', D: 'By letter' }, correctAnswer: 'D' }
                ]
            },
            {
                id: 'passage-7-5-5',
                text: `Construction Superintendent
Jones-Richmond Construction (JRC)
Founded 25 years ago, JRC is a full-service general contractor serving clients throughout Winnipeg and the surrounding area.
Responsibilities:
- Report to senior project manager
- Manage on-site construction activities
- Ensure compliance with safety regulations
- Negotiate purchases and contracts
- Establish construction schedules
Qualifications:
- Minimum five years of commercial construction experience
- Willingness to travel to job sites daily (usually within a 50-kilometre radius)
- Strong written communication skills
To apply, submit a résumé and cover letter through www.jrc.ca/apply.`,
                questions: [
                    { id: '155', questionText: 'What is suggested about Jones-Richmond Construction?', options: { A: 'It is a new company.', B: 'It has won industry awards for its work.', C: 'It is based in Winnipeg.', D: 'It specializes in home construction projects.' }, correctAnswer: 'C' },
                    { id: '156', questionText: 'What is NOT listed as a responsibility of the construction superintendent?', options: { A: 'Setting schedules', B: 'Training inexperienced workers', C: 'Participating in contract discussions', D: 'Ensuring worker safety' }, correctAnswer: 'B' },
                    { id: '157', questionText: 'According to the advertisement, what must a successful job applicant have?', options: { A: 'A technical certification', B: 'A reference letter from a former employer', C: 'Senior management experience', D: 'The ability to visit construction sites each workday' }, correctAnswer: 'D' }
                ]
            },
            {
                id: 'passage-7-5-6',
                text: `To: All Sledgehammer Gym Staff
From: Lucas Sledge
Date: September 15
Subject: Payroll changes
Attachment: Form
Dear Staff,
Thanks to your dedicated work, word of our little gym has spread. Over the past twelve months, enrollment has significantly increased and so has our teaching staff. Although this growth is wonderful, having to process the payroll by myself has become rather burdensome. Therefore, I have contracted Trumbull and Company to provide direct deposit of your wages into your bank accounts. — [1] —. Consequently, you no longer need to deposit your paycheck yourself. Also, you will now be able to get your pay stubs and tax information online. — [2] —.
To allow for these changes, I am asking everyone to provide me with the necessary banking details. Please complete the attached form and bring it to the office with a voided check no later than September 25. — [3] —. The new process will take effect in October. — [4] —. Please let me know if you have any questions.
Take care,
Lucas`,
                questions: [
                    { id: '158', questionText: 'What is mentioned as a benefit of the new payment system?', options: { A: "It will reduce Mr. Sledge's workload.", B: 'It will include more staff involvement.', C: 'It will simplify tax collection.', D: 'It will result in fewer payment errors.' }, correctAnswer: 'A' },
                    { id: '159', questionText: 'What does Mr. Sledge ask employees to do?', options: { A: 'Update their contact information', B: 'Submit ideas on how to improve the gym', C: 'Provide information about their bank account', D: 'Sign up for a professional development class' }, correctAnswer: 'C' },
                    { id: '160', questionText: 'In which of the positions marked [1], [2], [3], and [4] does the following sentence best belong?\n"If I am not around, please see my assistant."', options: { A: '[1]', B: '[2]', C: '[3]', D: '[4]' }, correctAnswer: 'A' }
                ]
            },
            {
                id: 'passage-7-5-7',
                text: `Aussie Coffee Fair This Weekend
SYDNEY (4 June)—Coffee will be the main attraction this weekend at the Aussie Coffee Fair hosted by Homewares, the country's top kitchen appliance manufacturer. The event will be held at the Harbour Expo Centre.
The two-day event will feature a variety of coffee-oriented presentations by coffee growers and roasters, food writers, makers of kitchen equipment, and chefs. Foods and beverages will be available to view, taste, and buy at booths throughout the centre.
Sessions will feature demonstrations on cooking with coffee and tips for brewing the best cup of coffee, as well as information on nonfood uses for coffee. In addition, culinary experts will be on hand to meet with coffee enthusiasts for discussions designed to help them create a true coffeehouse experience in their own homes.
Entry to the Aussie Coffee Fair is free. However, registration is required as space is limited. For information and to register online, go to www.aussiecoffeefair.com.`,
                questions: [
                    { id: '161', questionText: 'The word "top" in paragraph 1, line 3, is closest in meaning to', options: { A: 'only', B: 'leading', C: 'highest', D: 'modern' }, correctAnswer: 'B' },
                    { id: '162', questionText: 'Who will NOT be conducting informational presentations at the fair?', options: { A: 'Chefs', B: 'Coffee growers', C: 'Equipment makers', D: 'Coffeehouse owners' }, correctAnswer: 'D' },
                    { id: '163', questionText: 'What must people do to attend the fair?', options: { A: 'Sign up on a Web site', B: 'Call to make a reservation', C: 'Buy a ticket at the event location', D: 'Present a Homewares product receipt' }, correctAnswer: 'A' }
                ]
            },
            {
                id: 'passage-7-5-8',
                text: `From: melissa@grandgrainsbakery.com
To: elinorotero@webmail.com
Date: October 28
Re: Desserts
Dear Ms. Otero,
I just followed up with our baker about your request to have an assortment of desserts instead of one large cake for the party you are hosting at your home on November 7. We suggest ordering three dessert pieces per person. The cost for three desserts is between $10 and $12 per person. Our most popular desserts are the mini cheesecakes, the berry tartlets, and the brownies.
I know you are using a separate caterer for the lunch, and they will help serve and clean up after the party. You also mentioned that you were considering whether to put the dessert table in your backyard or inside your house. Just keep in mind that if you order the cheesecakes, they should not be left out for more than two hours. If you give us very specific instructions about where to set up the desserts, our staff can leave them in the appropriate place without disturbing the party.
Once you make your dessert choices, simply let us know how many guests you expect, and we can take care of the rest.
Melissa Luhya
Grand Grains Bakery`,
                questions: [
                    { id: '164', questionText: 'What is the purpose of the e-mail?', options: { A: 'To advertise some new pastries', B: 'To present options for an event', C: 'To recommend serving a larger cake', D: 'To request payment on an order' }, correctAnswer: 'B' },
                    { id: '165', questionText: 'What does Ms. Luhya indicate about the mini cheesecakes?', options: { A: 'They are the most expensive dessert.', B: 'They are available in several flavors.', C: 'They should not be unrefrigerated for a long time.', D: 'They cannot be ordered in larger sizes.' }, correctAnswer: 'C' },
                    { id: '166', questionText: 'The word "disturbing" in paragraph 2, line 6, is closest in meaning to', options: { A: 'interrupting', B: 'frightening', C: 'rearranging', D: 'moving' }, correctAnswer: 'A' },
                    { id: '167', questionText: 'What information does Ms. Luhya request from Ms. Otero?', options: { A: 'A street address', B: 'An approximate budget', C: 'The name of a caterer', D: 'The number of guests' }, correctAnswer: 'D' }
                ]
            },
            {
                id: 'passage-7-5-9',
                text: `To: Cheryl Futrel <cfutrel@zephyrmail.com>
From: Lydia Matsuda <service@candella.com>
Date: June 9
Subject: Home decorating
Dear Ms. Futrel,
Thank you for your interest in Candella Interior Design. — [1] —. We are proud to claim that we are the oldest and most successful online design consulting company in the region. We welcome you as a new client. — [2] —. From modest country homes to urban apartments, we do it all.
We understand from your original inquiry that you intend to sell your apartment soon and are primarily interested in how best to present it to prospective buyers. Here's how our design services work: the first step is completing an online questionnaire. — [3] —. Next, you will be matched with an online professional interior designer who can help you with all choices for paint colors, window treatments, and floor coverings. You will receive a room layout plan and a personalized list of ideas for furniture and accessories, with all products available for purchase online. — [4] —. As a special bonus, from now until July 1 our online retail partners have agreed to offer a 10 percent discount on products purchased through our links.
Finally, you will be glad to learn that we charge not by the hour but by the room for our design ideas, with the average price being about $275 per room.
We look forward to hearing from you and working with you soon.
Sincerely,
Lydia Matsuda`,
                questions: [
                    { id: '168', questionText: 'What is indicated about Candella Interior Design?', options: { A: 'Its main office is located in a major city.', B: "Its staff members visit clients' houses.", C: 'It has been in business longer than its competitors have been.', D: 'It is a family-run business.' }, correctAnswer: 'C' },
                    { id: '169', questionText: 'Why does Ms. Futrel want to redecorate her apartment?', options: { A: 'To prepare for a visit from relatives', B: 'To make it attractive to potential buyers', C: 'To replace furniture that she dislikes', D: 'To use it as an example for her clients' }, correctAnswer: 'B' },
                    { id: '170', questionText: 'What will happen on July 1?', options: { A: 'Room accessories will be distributed.', B: 'Work will begin on a new project.', C: 'The client list will be expanded.', D: 'A special offer will end.' }, correctAnswer: 'D' },
                    { id: '171', questionText: 'In which of the positions marked [1], [2], [3], and [4] does the following sentence best belong?\n"The answers will give us a sense of your taste and requirements."', options: { A: '[1]', B: '[2]', C: '[3]', D: '[4]' }, correctAnswer: 'C' }
                ]
            },
            {
                id: 'passage-7-5-10',
                text: `Darius Wilkins (11:09 A.M.): Hi, Ms. Clarke. This is Darius from Roto Bicycle. I promised to check with you before servicing your bicycle.
Lauren Clarke (11:14 A.M.): Thanks. So, what do you think?
Darius Wilkins (11:15 A.M.): In addition to the regular maintenance service, I suggest a drivetrain cleaning and new brake mechanisms.
Lauren Clarke (11:16 A.M.): OK. What does that come to?
Darius Wilkins (11:18 A.M.): An extensive maintenance service, which includes the same gear and brake adjustments as a regular maintenance service, plus the drivetrain cleaning, is $140. Add $70 for two new brake mechanisms and pads and another $30 for labor charges. So it should come to around $240 altogether. Shall I move forward?
Lauren Clarke (11:21 A.M.): Wow! That much?
Darius Wilkins (11:22 A.M.): Especially with that major bicycle race you have ahead of you.
Lauren Clarke (11:24 A.M.): I know. I guess we have to do it. Please let me know when it's ready.`,
                questions: [
                    { id: '172', questionText: 'Why did Mr. Wilkins contact Ms. Clarke?', options: { A: 'To recommend a new product', B: 'To discuss a scheduling problem', C: 'To confirm that a bicycle part has been ordered', D: 'To request permission to do some work' }, correctAnswer: 'D' },
                    { id: '173', questionText: 'What most likely cost about $30?', options: { A: 'New braking mechanisms', B: 'Labor charges', C: 'Basic maintenance service', D: 'Drivetrain cleaning' }, correctAnswer: 'B' },
                    { id: '174', questionText: 'At 11:21 A.M., what does Ms. Clarke imply when she writes, "That much"?', options: { A: 'She did not realize how busy Mr. Wilkins is.', B: 'The pressure in her tires was surprisingly low.', C: 'The cost of repairs seems high.', D: 'Repairing the bike will take more time than she expected.' }, correctAnswer: 'C' },
                    { id: '175', questionText: 'What is suggested about Ms. Clarke?', options: { A: 'She prefers to pay with cash.', B: 'She is shopping for a new bicycle.', C: 'She is unhappy with the quality of a repair.', D: 'She will soon compete in a bicycle race.' }, correctAnswer: 'D' }
                ]
            },
            {
                id: 'passage-7-5-11',
                text: `E-Mail Message
To: Cassie Raferty <cassie@mailcurrent.ie>
From: Youssef Zimri <zimri@zimrimechanical.ie>
Subject: Following up
Date: 12 September
Attachment: cmcclinic
Dear Ms. Raferty,
I am very happy with your work so far. Your suggestion to add photos from our archive certainly dressed up the "Company History" page. The help-wanted pop-up bubble on the home page also looks good. Hopefully, it will attract applicants with mechanical experience.
I'd like you to add one more project to our "Portfolio" page. We have finally finished replacing the plumbing and heating systems at Clary Medical Centre's satellite clinic in Galway. It was a challenging job, and I'm proud of our results. The attachment contains photos and a short description of what we did there.
Sincerely,
Youssef Zimri
Owner, Zimri Mechanical
---
https://www.clarymedicalcentre.ie
Clinic opening soon
We have repurposed 47 High Street, Galway, into a satellite medical clinic and will celebrate with a grand opening party on Friday, 28 October. Remarks by Medical Director Dr. Celia O'Leary and local elected officials will begin promptly at 1:00 P.M., followed by a ribbon-cutting ceremony and tours until 4:30 P.M.
Thirty miles from the Clary Medical Centre's main campus, the Clary Clinic is housed in the historic Brandmore shoe factory, which closed more than two decades ago. During renovations, care was taken to maintain the exterior's nineteenth-century architectural features. The clinic's interior boasts eighteen examination rooms, a state-of-the-art x-ray facility, private offices for patient consultations, and a lab for processing patient samples.
Clinic staff will begin seeing patients on Tuesday, 1 November. To make an appointment, please call 020 915 1424.`,
                questions: [
                    { id: '176', questionText: 'Who most likely is Ms. Raferty?', options: { A: 'A job recruiter', B: 'A plumbing contractor', C: 'A Galway historian', D: 'A Web-site designer' }, correctAnswer: 'D' },
                    { id: '177', questionText: 'What is indicated about Mr. Zimri?', options: { A: 'He is trying to recruit an assistant architect.', B: "He is a member of Clary Medical Centre's board of directors.", C: "He is pleased with his firm's work at a former shoe factory.", D: "He is waiting for Dr. O'Leary's feedback on a portfolio." }, correctAnswer: 'C' },
                    { id: '178', questionText: 'According to the Web page, what will happen at the grand opening event?', options: { A: 'Government officials will be in attendance.', B: 'Sandwiches will be served.', C: 'New building plans will be revealed.', D: 'Former patients will be interviewed.' }, correctAnswer: 'A' },
                    { id: '179', questionText: 'On the Web page, the word “maintain" in paragraph 2, line 3, is closest in meaning to', options: { A: 'assert', B: 'heal', C: 'support', D: 'preserve' }, correctAnswer: 'D' },
                    { id: '180', questionText: 'According to the Web page, what is NOT part of the Clary Clinic?', options: { A: 'A medical laboratory', B: 'A pharmacy', C: 'Medical imaging equipment', D: 'Offices for clinicians' }, correctAnswer: 'B' }
                ]
            },
            {
                id: 'passage-7-5-12',
                text: `PURCHASE ORDER
2 October
Purchase Order: 5338
Pirate's Bounty Seafood
11 Harbor Street
Charlottetown, Prince Edward Island, C1A 0A5
VENDOR: Rochette's Commercial Refrigeration, 2175 Lyons Avenue, Guelph, Ontario, NIC 0A1
SHIP TO: Pirate's Bounty Seafood, 11 Harbor Street, Charlottetown, Prince Edward Island, C1A 0A5, Attn: Lenore Okiya
---
ITEM NUMBER: BF550
DESCRIPTION: Blizzard walk-in freezer. Features: 1.5m x 2m x 2.5m, adjustable shelves, aluminum flooring, galvanized steel panels
QUANTITY: 1, PRICE: $6,400.00, TOTAL: $6,400.00
COMMENTS OR SPECIAL INSTRUCTIONS: Restaurant expanding. Need unit by 17 November.
SUBTOTAL: $6,400.00
TAX: $960.00
GRAND TOTAL: $7,360.00
---
To: Lenore Okiya <l.okiya@piratesbounty.ca>
From: Shaliya Umuma <customerservice@rochettesrefrigeration.ca>
Date: 3 October
Subject: Purchase Order 5338
Dear Ms. Okiya,
We received your purchase order for the Blizzard walk-in freezer. Unfortunately, the model you requested is on back order and will not be available for three months. We regret the inconvenience and would like to offer you some options.
I can offer you the Blizzard BF600, which measures 2m x 2.5m x 3m, at the discounted price of $6,900 plus tax. It comes with the same features as the item you ordered.
Alternately, we have a refurbished BF400 in stock. It's the same size as the BF550; however, while the BF550 includes a remote control for setting the temperature, the BF400 has a wall-mounted device for that purpose. The BF400 unit comes with a two-year warranty. It is priced at $5,600 plus tax.
Please let me know how you wish to proceed. Just reply to this e-mail.
Shaliya Umuma, Customer Service Manager`,
                questions: [
                    { id: '181', questionText: "Why does Pirate's Bounty Seafood need to purchase new equipment?", options: { A: 'Its current refrigerator stopped working.', B: 'The warranty on its current refrigerator has expired.', C: 'The restaurant is increasing in size.', D: 'The restaurant is moving to a new location.' }, correctAnswer: 'C' },
                    { id: '182', questionText: 'What is the problem with the item Ms. Okiya ordered?', options: { A: 'It was lost during shipping.', B: 'It has been discontinued.', C: 'It is temporarily out of stock.', D: 'It has a damaged control panel.' }, correctAnswer: 'C' },
                    { id: '183', questionText: 'What is NOT a feature of the Blizzard BF600?', options: { A: 'It has a fast-freeze switch.', B: 'It has adjustable shelves.', C: 'It has aluminum flooring.', D: 'It has galvanized steel panels.' }, correctAnswer: 'A' },
                    { id: '184', questionText: 'According to the e-mail, what does the BF400 model come with?', options: { A: 'A user manual', B: 'A remote control', C: 'A warranty', D: 'A tax waiver' }, correctAnswer: 'C' },
                    { id: '185', questionText: 'In the e-mail, the word "Just” in paragraph 3, line 1, is closest in meaning to', options: { A: 'immediately', B: 'kindly', C: 'shortly', D: 'simply' }, correctAnswer: 'D' }
                ]
            },
            {
                id: 'passage-7-5-13',
                text: `Fifth Annual International Marketing Society Conference
23–25 October, Grant Hotel and Conference Centre, London
Day 1:
Time | Description | Venue
---|---|---
7:00 A.M. to 8:00 A.M. | Morning Social: Complimentary omelets, pastries, coffee, tea | Mezzanine
8:30 A.M. to 10:00 A.M. | Marcos Secada, founder and CEO, Grindstone Marketing Group | Room 2
10:30 A.M. to noon | Claire Song, business columnist and best-selling author | Room 10
12:30 P.M. to 2:00 P.M. | Lunch (ticket purchase required) | Alexander Ballroom
---
To: Nadir Kalwar <kalwar.n@kdbuildingconcepts.com>
From: Olek Dzik <odzik.k@kdbuildingconcepts.com>
Date: 12 May
Subject: Upcoming marketing campaign
Attachment: Link to video
Nadir,
Thanks for your help with the corporate marketing plan. Attached is a link to the video created for us by Grindstone Marketing Group. It shows our 3-D printing equipment pouring fast-setting concrete, layer by layer. I think it looks great as is, and I believe it will be the most compelling aspect of our 1 June launch, especially if the Sheffield house is sold by then.
In case you haven't heard, our next construction project will be a home just a couple of kilometres from your office building!
Olek
---
House Constructed Using 3-D Technology For Sale
SHEFFIELD (15 May)—An international construction firm specializing in innovative building technologies has completed one of Britain's first 3-D printed houses. The new structure is located on Morgan Road in Sheffield.
KD Building Concepts took less than two weeks to execute the first phase of the project, which entailed printing the concrete walls and installing the electrical and plumbing systems, according to company president Olek Dzik. In just two months, the fully landscaped house with two bedrooms and two bathrooms was ready for market.
"Labour costs were cut in half thanks to 3-D printing technology," said Mr. Dzik, whose company has offices in France and Germany, as well as in Sheffield. "At KD Building Concepts, we are committed to building homes that are both affordable and luxurious."
The house was listed for sale this week by a local real estate broker. The asking price is £150,000.
Next on the horizon for KD Building Concepts is the construction of a home in Hamburg, Germany.`,
                questions: [
                    { id: '186', questionText: 'What is mentioned on the schedule?', options: { A: 'Free breakfast is available for conference participants.', B: 'The conference is five days long.', C: 'A keynote address will be delivered at the end of the first day.', D: 'A featured speaker has been replaced.' }, correctAnswer: 'A' },
                    { id: '187', questionText: 'According to the schedule, what will happen at 10:30 A.M.?', options: { A: 'A writer will give a presentation.', B: 'Coffee will be served in the lobby.', C: 'Lunch tickets will be sold in room 10.', D: 'A revised schedule will be distributed.' }, correctAnswer: 'A' },
                    { id: '188', questionText: 'What can be concluded about Mr. Dzik?', options: { A: 'He wants a marketing video to be shortened.', B: 'He has asked Mr. Kalwar for a new marketing plan.', C: 'He organized a conference in London.', D: "He hired Mr. Secada's firm for a project." }, correctAnswer: 'D' },
                    { id: '189', questionText: 'What is suggested about Mr. Kalwar?', options: { A: 'He is a videographer.', B: 'He works in Germany.', C: 'He is planning to buy a house in Sheffield.', D: 'He specializes in construction materials.' }, correctAnswer: 'D' },
                    { id: '190', questionText: 'What does the article indicate about the house created with a 3-D printer?', options: { A: 'It cost £150,000 to build.', B: 'It was finished in two months.', C: 'It will be landscaped next week.', D: 'Its bedrooms are all the same size.' }, correctAnswer: 'B' }
                ]
            },
            {
                id: 'passage-7-5-14',
                text: `Gallery manager at Richard Lahiri Gallery in Cromwood
Applicants for this full-time position must have experience in retail art with an established history of successfully attracting patrons interested in purchasing original works of art. Experience managing a social media account is also desired. The position will be primarily on-site; however, some remote hours can be scheduled. Candidates must be available to start work on or before April 1. Qualified applicants should contact gallery director Richard Lahiri at rlahiri@richardlahirigallery.com.
---
Summer Scene Arts Program
Starting on May 1, five art galleries in Cromwood will be hosting open houses every Friday from May through August. Come enjoy live music, refreshments, artist talks, and more on the Cromwood boardwalk. Activities start at 4:00 P.M. and continue until 9:30 P.M., rain or shine. Participating galleries are listed below.
Rita Blake Art • Siitva Gallery • Richard Lahiri Gallery • Patricia Dolivo Painting • Ashland Pottery and Crafts
Funded by the Cromwood City Council and Regents Bank
---
Summer Activities in Middleton County
Compiled by Lisa Yu-Seaver
Cromwood Art Nights
Residents of Elmhurst, Melbridge, and Cromwood are invited to explore the local art scene in Cromwood this summer. The five galleries on the boardwalk overlooking the Wye River are holding special events each Friday as part of the Summer Scene Arts Program. This Friday, Richard Lahiri and his gallery manager, Geetu Gelang, will use a giant screen to demonstrate software for creating virtual art. The event will also feature craft vendors, food trucks, and live music. See www.cromwood.gov/things-to-do for more information.
Movies in Brady Park
The popular summer movie series in Herrontown returns on June 16! Each Saturday evening, a classic film will be projected on Brady Park's Grand Lawn. Bring your picnic basket and a blanket and get comfortable! The schedule of films is available at www.bradypark.org/activities.`,
                questions: [
                    { id: '191', questionText: 'What is stated in the job posting about the managerial position?', options: { A: 'It is fully on-site.', B: "It is Mr. Lahiri's current job.", C: 'It requires sales experience.', D: 'It will be part-time until April 1.' }, correctAnswer: 'C' },
                    { id: '192', questionText: 'According to the flyer, what will happen on May 1?', options: { A: 'A public arts program will begin.', B: 'A city council meeting will take place.', C: 'A new art gallery will hold a grand opening.', D: 'Regents Bank will be closed for the day.' }, correctAnswer: 'A' },
                    { id: '193', questionText: 'What is suggested about Ashland Pottery and Crafts?', options: { A: 'It is located near the Wye River.', B: 'It specializes in virtual art.', C: 'It hosts pottery workshops every Saturday.', D: 'It is sponsoring a summer movie series.' }, correctAnswer: 'A' },
                    { id: '194', questionText: 'What is suggested about Geetu Gelang?', options: { A: 'She is a local musician.', B: 'She will be selling her crafts on May 1.', C: 'She plans to start a social media account.', D: 'She was recently hired by the Richard Lahiri Gallery.' }, correctAnswer: 'D' },
                    { id: '195', questionText: 'According to the article, where is Brady Park located?', options: { A: 'In Cromwood', B: 'In Elmhurst', C: 'In Herrontown', D: 'In Melbridge' }, correctAnswer: 'C' }
                ]
            },
            {
                id: 'passage-7-5-15',
                text: `Senano Designs Buys Gendalla in $60 Million Deal
LOS ANGELES (March 20)—Fashion powerhouse Senano Designs announced on Wednesday that it had acquired Gendalla, an up-and-coming luxury brand. The acquisition is part of Senano's plan to supplement its clothing products with a line of designer watches. Over the next two years, the company has further plans to expand its offerings to include fragrances and luggage. Lina Pacheco, Senano's chief executive officer, said that such expansion is necessary to keep up and compete with other international fashion houses. Although based in Los Angeles, in recent years Senano has opened offices in Philadelphia, Chicago, and Miami. Ms. Pacheco says she was unfamiliar with Gendalla products until a year ago, when she saw one of their ads in an automobile magazine. “The products have a distinctive, modern style," Ms. Pacheco said, "which will go well with Senano's trendsetting clothes."
---
MEMO
From: Oscar Johansen, Accounting department
To: All Gendalla employees
Date: March 22
Subject: Travel expense policy
Attachment: Policy
I have attached a copy of Senano's policy on travel expenses, which will go into effect when we officially become employees of Senano on March 31.
Note that Senano's policy is more restrictive than Gendalla's policy in several ways. For example, employees will no longer have one month to submit expense reports. However, the new policy will make some processes much easier: specifically, Senano's requirements for submitting expenses under $50 are simpler than those under current Gendalla policy.
Carlie Dawson, an accounting director who works at Senano's headquarters, will come to our New York office to lead an information session about this and other policy-related changes on Thursday, March 28, at 2:00 P.M. I strongly encourage you to attend.
---
Senano Designs Travel Expense Policy
- To be reimbursed for work-related travel, employees must submit a travel request at least two weeks before a trip, listing the reason for travel and estimating all expenses.
- Original receipts must be submitted for expenses above $50. Any expenses below that do not require the submission of original receipts.
- All receipts and expense reports must be submitted within three weeks after a trip is completed. Expenses submitted after this time will require the approval of the department head.`,
                questions: [
                    { id: '196', questionText: 'What does Gendalla mainly produce?', options: { A: 'Watches', B: 'Luggage', C: 'Clothing', D: 'Fragrances' }, correctAnswer: 'A' },
                    { id: '197', questionText: 'According to the article, why is Senano Designs acquiring Gendalla?', options: { A: 'To sell products at a lower price', B: 'To expand its social media presence', C: 'To offer a more diverse range of products', D: 'To address declining sales in some cities' }, correctAnswer: 'C' },
                    { id: '198', questionText: "What are Gendalla's employees invited to do on March 28?", options: { A: 'Suggest changes to a travel policy', B: 'Attend a meeting in the afternoon', C: "Tour Senano's corporate headquarters", D: 'Make an appointment with an accountant' }, correctAnswer: 'B' },
                    { id: '199', questionText: "Where is Ms. Dawson's office?", options: { A: 'In New York', B: 'In Chicago', C: 'In Philadelphia', D: 'In Los Angeles' }, correctAnswer: 'D' },
                    { id: '200', questionText: "How is Gendalla's current travel expense policy likely different from Senano's?", options: { A: 'A receipt must be submitted for every expense.', B: 'Preapproval must be obtained for expenses over $50.', C: 'The expense report must be signed by a manager.', D: 'Employees can submit their expense reports jointly.' }, correctAnswer: 'A' }
                ]
            }
        ]
    }
};