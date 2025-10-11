import { ReadingTestData } from '../types';

export const readingPart5Tests: Record<number, ReadingTestData> = {
    1: {
        id: 1,
        title: 'Part 5 - Test 1',
        part: 5,
        passages: [
            {
                id: 'passage-5-1-1',
                text: 'Directions: A word or phrase is missing in each of the sentences below. Four answer choices are given below each sentence. Select the best answer to complete the sentence.',
                questions: [
                    { id: '101', questionText: 'Former Sendai Company CEO Ken Nakata spoke about ______ career experiences.', options: { A: 'he', B: 'his', C: 'him', D: 'himself' }, correctAnswer: 'B' },
                    { id: '102', questionText: 'Passengers who will be taking a ______ domestic flight should go to Terminal A.', options: { A: 'connectivity', B: 'connects', C: 'connect', D: 'connecting' }, correctAnswer: 'D' },
                    { id: '103', questionText: "Fresh and ______ apple-cider donuts are available at Oakcrest Orchard's retail shop for £6 per dozen.", options: { A: 'eaten', B: 'open', C: 'tasty', D: 'free' }, correctAnswer: 'C' },
                    { id: '104', questionText: 'Zahn Flooring has the widest selection of ______ in the United Kingdom.', options: { A: 'paints', B: 'tiles', C: 'furniture', D: 'curtains' }, correctAnswer: 'B' },
                    { id: '105', questionText: 'One responsibility of the IT department is to ensure that the company is using ______ software.', options: { A: 'update', B: 'updating', C: 'updates', D: 'updated' }, correctAnswer: 'D' },
                    { id: '106', questionText: "It is wise to check a company's dress code ______ visiting its head office.", options: { A: 'so', B: 'how', C: 'like', D: 'before' }, correctAnswer: 'D' },
                    { id: '107', questionText: "Wexler Store's management team expects that employees will ______ support any new hires.", options: { A: 'enthusiastically', B: 'enthusiasm', C: 'enthusiastic', D: 'enthused' }, correctAnswer: 'A' },
                    { id: '108', questionText: 'Wheel alignments and brake system ______ are part of our vehicle service plan.', options: { A: 'inspects', B: 'inspector', C: 'inspected', D: 'inspections' }, correctAnswer: 'D' },
                    { id: '109', questionText: 'Registration for the Marketing Coalition Conference is now open ______ September 30.', options: { A: 'until', B: 'into', C: 'yet', D: 'while' }, correctAnswer: 'A' },
                    { id: '110', questionText: 'Growth in the home entertainment industry has been ______ this quarter.', options: { A: 'separate', B: 'limited', C: 'willing', D: 'assorted' }, correctAnswer: 'B' },
                    { id: '111', questionText: 'Hawson Furniture will be making ______ on the east side of town on Thursday.', options: { A: 'deliveries', B: 'delivered', C: 'deliver', D: 'deliverable' }, correctAnswer: 'A' },
                    { id: '112', questionText: 'The Marlton City Council does not have the authority to ______ parking on city streets.', options: { A: 'drive', B: 'prohibit', C: 'bother', D: 'travel' }, correctAnswer: 'B' },
                    { id: '113', questionText: 'Project Earth Group is ______ for ways to reduce transport-related greenhouse gas emissions.', options: { A: 'looking', B: 'seeing', C: 'driving', D: 'leaning' }, correctAnswer: 'A' },
                    { id: '114', questionText: 'Our skilled tailors are happy to design a custom-made suit that fits your style and budget ______. ', options: { A: 'perfect', B: 'perfects', C: 'perfectly', D: 'perfection' }, correctAnswer: 'C' },
                    { id: '115', questionText: 'Project manager Hannah Chung has proved to be very ______ with completing company projects.', options: { A: 'helpfulness', B: 'help', C: 'helpfully', D: 'helpful' }, correctAnswer: 'D' },
                    { id: '116', questionText: 'Lehua Vacation Club members will receive double points ______ the month of August at participating hotels.', options: { A: 'onto', B: 'above', C: 'during', D: 'between' }, correctAnswer: 'C' },
                    { id: '117', questionText: 'The costumes were not received ______ enough to be used in the first dress rehearsal.', options: { A: 'far', B: 'very', C: 'almost', D: 'soon' }, correctAnswer: 'D' },
                    { id: '118', questionText: 'As a former publicist for several renowned orchestras, Mr. Wu would excel in the role of event ______. ', options: { A: 'organized', B: 'organizer', C: 'organizes', D: 'organizational' }, correctAnswer: 'B' },
                    { id: '119', questionText: "The northbound lane on Davis Street will be ______ closed because of the city's bridge reinforcement project.", options: { A: 'temporarily', B: 'competitively', C: 'recently', D: 'collectively' }, correctAnswer: 'A' },
                    { id: '120', questionText: 'Airline representatives must handle a wide range of passenger issues, ______ missed connections to lost luggage.', options: { A: 'from', B: 'under', C: 'on', D: 'against' }, correctAnswer: 'A' },
                    { id: '121', questionText: 'The meeting notes were ______ deleted, but Mr. Hahm was able to recreate them from memory.', options: { A: 'accident', B: 'accidental', C: 'accidents', D: 'accidentally' }, correctAnswer: 'D' },
                    { id: '122', questionText: 'The current issue of Farming Scene magazine predicts that the price of corn will rise 5 percent over the ______ year.', options: { A: 'next', B: 'with', C: 'which', D: 'now' }, correctAnswer: 'A' },
                    { id: '123', questionText: 'Anyone who still ______ to take the fire safety training should do so before the end of the month.', options: { A: 'needing', B: 'needs', C: 'has needed', D: 'were needing' }, correctAnswer: 'B' },
                    { id: '124', questionText: 'Emerging technologies have ______ begun to transform the shipping industry in ways that were once unimaginable.', options: { A: 'already', B: 'exactly', C: 'hardly', D: 'closely' }, correctAnswer: 'A' },
                    { id: '125', questionText: 'The company handbook outlines the high ______ that employees are expected to meet every day.', options: { A: 'experts', B: 'accounts', C: 'recommendations', D: 'standards' }, correctAnswer: 'D' },
                    { id: '126', questionText: 'Because ______ of the board members have scheduling conflicts, the board meeting will be moved to a date when all can attend.', options: { A: 'any', B: 'everybody', C: 'those', D: 'some' }, correctAnswer: 'D' },
                    { id: '127', questionText: 'The project ______ the collaboration of several teams across the company.', options: { A: 'passed', B: 'decided', C: 'required', D: 'performed' }, correctAnswer: 'C' },
                    { id: '128', questionText: "We cannot send the store's coupon booklet to the printers until it ______ by Ms. Jeon.", options: { A: 'is approving', B: 'approves', C: 'has been approved', D: 'will be approved' }, correctAnswer: 'C' },
                    { id: '129', questionText: '______ the closure of Verdigold Transport Services, we are looking for a new shipping company.', options: { A: 'In spite of', B: 'Just as', C: 'In light of', D: 'According to' }, correctAnswer: 'C' },
                    { id: '130', questionText: "The ______ information provided by Uniss Bank's brochure helps applicants understand the terms of their loans.", options: { A: 'arbitrary', B: 'supplemental', C: 'superfluous', D: 'potential' }, correctAnswer: 'B' },
                ]
            }
        ]
    },
    2: {
        id: 2,
        title: 'Part 5 - Test 2',
        part: 5,
        passages: [
            {
                id: 'passage-5-2-1',
                text: 'Directions: A word or phrase is missing in each of the sentences below. Four answer choices are given below each sentence. Select the best answer to complete the sentence.',
                questions: [
                    { id: '101', questionText: 'Before operating your handheld device, please ______ the enclosed cable to charge it.', options: { A: 'plan', B: 'remain', C: 'use', D: 'finish' }, correctAnswer: 'C' },
                    { id: '102', questionText: "Safile's new external hard drive can ______ store up to one terabyte of data.", options: { A: 'secure', B: 'security', C: 'securely', D: 'secured' }, correctAnswer: 'C' },
                    { id: '103', questionText: 'Mr. Peterson will travel ______ the Tokyo office for the annual meeting.', options: { A: 'to', B: 'through', C: 'in', D: 'over' }, correctAnswer: 'A' },
                    { id: '104', questionText: 'Yong-Soo Cosmetics will not charge for items on back order until ______ have left our warehouse.', options: { A: 'them', B: 'they', C: 'themselves', D: 'their' }, correctAnswer: 'B' },
                    { id: '105', questionText: 'Our premium day tour takes visitors to historic sites ______ the Aprico River.', options: { A: 'onto', B: 'since', C: 'inside', D: 'along' }, correctAnswer: 'D' },
                    { id: '106', questionText: 'Eighty percent of drivers surveyed said they would consider buying a vehicle that runs on ____.', options: { A: 'electricity', B: 'electrically', C: 'electricians', D: 'electrify' }, correctAnswer: 'A' },
                    { id: '107', questionText: 'Xinzhe Zu has ______ Petrin Engineering as the vice president of operations.', options: { A: 'attached', B: 'resigned', C: 'joined', D: 'combined' }, correctAnswer: 'C' },
                    { id: '108', questionText: "Next month, Barder House Books will be holding ______ third author's hour in Cleveland.", options: { A: 'it', B: 'itself', C: 'its own', D: 'its' }, correctAnswer: 'D' },
                    { id: '109', questionText: "Chester's Tiles ______ expanded to a second location in Turnington.", options: { A: 'severely', B: 'usually', C: 'recently', D: 'exactly' }, correctAnswer: 'C' },
                    { id: '110', questionText: "Tabrino's has ______ increased the number of almonds in the Nut Medley snack pack.", options: { A: 'significant', B: 'significance', C: 'signifies', D: 'significantly' }, correctAnswer: 'D' },
                    { id: '111', questionText: '______ she travels, Jacintha Flores collects samples of local fabrics and patterns.', options: { A: 'Wherever', B: 'In addition to', C: 'Either', D: 'In contrast to' }, correctAnswer: 'A' },
                    { id: '112', questionText: 'Most picture ______ at Glowing Photo Lab go on sale at 3:00 P.M. today.', options: { A: 'framer', B: 'framing', C: 'framed', D: 'frames' }, correctAnswer: 'D' },
                    { id: '113', questionText: 'All students in the business management class hold ______ college degrees.', options: { A: 'late', B: 'developed', C: 'advanced', D: 'elated' }, correctAnswer: 'C' },
                    { id: '114', questionText: "We hired Noah Wan of Shengyao Accounting Ltd. ______ our company's financial assets.", options: { A: 'to evaluate', B: 'to be evaluated', C: 'will be evaluated', D: 'evaluate' }, correctAnswer: 'A' },
                    { id: '115', questionText: 'Ms. Charisse is taking on a new account ______ she finishes the Morrison project.', options: { A: 'with', B: 'going', C: 'after', D: 'between' }, correctAnswer: 'C' },
                    { id: '116', questionText: "Cormet Motors' profits are ______ this year than last year.", options: { A: 'higher', B: 'high', C: 'highly', D: 'highest' }, correctAnswer: 'A' },
                    { id: '117', questionText: "In its ______ advertising campaign, Jaymor Tools demonstrates how reliable its products are.", options: { A: 'current', B: 'relative', C: 'spacious', D: 'collected' }, correctAnswer: 'A' },
                    { id: '118', questionText: 'Remember to submit receipts for reimbursement ______ returning from a business trip.', options: { A: 'such as', B: 'when', C: 'then', D: 'within' }, correctAnswer: 'B' },
                    { id: '119', questionText: "Patrons will be able to access Westside Library's ______ acquired collection of books on Tuesday.", options: { A: 'instantly', B: 'newly', C: 'early', D: 'naturally' }, correctAnswer: 'B' },
                    { id: '120', questionText: 'Please ______ any questions about time sheets to Tabitha Jones in the payroll department.', options: { A: 'direction', B: 'directive', C: 'directed', D: 'direct' }, correctAnswer: 'D' },
                    { id: '121', questionText: 'Before signing a delivery ______, be sure to double-check that all the items ordered are in the shipment.', options: { A: 'decision', B: 'announcement', C: 'receipt', D: 'limit' }, correctAnswer: 'C' },
                    { id: '122', questionText: 'Funds have been added to the budget for expenses ______ with the new building.', options: { A: 'associated', B: 'association', C: 'associate', D: 'associates' }, correctAnswer: 'A' },
                    { id: '123', questionText: 'Ms. Bernard ______ that a deadline was approaching, so she requested some assistance.', options: { A: 'noticed', B: 'obscured', C: 'withdrew', D: 'appeared' }, correctAnswer: 'A' },
                    { id: '124', questionText: 'Mr. Moscowitz is ______ that Dr. Tanaka will agree to present the keynote speech at this year\'s conference.', options: { A: 'hopes', B: 'hoped', C: 'hopeful', D: 'hopefully' }, correctAnswer: 'C' },
                    { id: '125', questionText: 'Two Australian companies are developing new smartphones, but it is unclear ______ phone will become available first.', options: { A: 'if', B: 'which', C: 'before', D: 'because' }, correctAnswer: 'B' },
                    { id: '126', questionText: 'Corners Gym offers its members a free lesson in how to use ______ properly.', options: { A: 'weighs', B: 'weights', C: 'weighty', D: 'weighed' }, correctAnswer: 'B' },
                    { id: '127', questionText: '______ the rules, overnight parking is not permitted at the clubhouse facility.', options: { A: 'Prior to', B: 'Except for', C: 'Instead of', D: 'According to' }, correctAnswer: 'D' },
                    { id: '128', questionText: 'Once everyone ______, we can begin the conference call.', options: { A: 'arrived', B: 'is arriving', C: 'to arrive', D: 'has arrived' }, correctAnswer: 'D' },
                    { id: '129', questionText: "Each summer a motivational video that highlights the past year's ______ is shown to all company employees.", options: { A: 'preferences', B: 'accomplishments', C: 'communications', D: 'uncertainties' }, correctAnswer: 'B' },
                    { id: '130', questionText: "Employees who wish to attend the retirement dinner ______ Ms. Howell's 30 years of service should contact Mr. Lee.", options: { A: 'honor', B: 'to honor', C: 'will honor', D: 'will be honored' }, correctAnswer: 'B' }
                ]
            }
        ]
    },
    3: {
        id: 3,
        title: 'Part 5 - Test 3',
        part: 5,
        passages: [
            {
                id: 'passage-5-3-1',
                text: 'Directions: A word or phrase is missing in each of the sentences below. Four answer choices are given below each sentence. Select the best answer to complete the sentence.',
                questions: [
                    { id: '101', questionText: '______ your order is being processed, please call customer service with any questions.', options: { A: 'Still', B: 'Either', C: 'While', D: 'Also' }, correctAnswer: 'C' },
                    { id: '102', questionText: 'ABC Truck Supplies has the ______ selection of mufflers in the state.', options: { A: 'natural', B: 'widest', C: 'overall', D: 'positive' }, correctAnswer: 'B' },
                    { id: '103', questionText: 'Sharswood Landscaping has received dozens of five-star ______ for its work.', options: { A: 'reviews', B: 'reviewer', C: 'reviewed', D: 'reviewing' }, correctAnswer: 'A' },
                    { id: '104', questionText: 'Dr. Cho will visit the Teledarr Lab during the annual open house, since ______ may not have another chance to see it.', options: { A: 'hers', B: 'she', C: 'her', D: 'herself' }, correctAnswer: 'B' },
                    { id: '105', questionText: 'Dorn Department Store decided to ______ its already large selection of housewares.', options: { A: 'create', B: 'enforce', C: 'apply', D: 'expand' }, correctAnswer: 'D' },
                    { id: '106', questionText: 'We ______ that you bring a portfolio of work samples to the interview.', options: { A: 'was asking', B: 'having asked', C: 'ask', D: 'asks' }, correctAnswer: 'C' },
                    { id: '107', questionText: 'Members of the Bold Stone Farm Store receive ______ discounts on all purchases.', options: { A: 'depth', B: 'deepen', C: 'deep', D: 'deeply' }, correctAnswer: 'C' },
                    { id: '108', questionText: 'If your plans change, please contact us at least 24 hours before the time of your _____.', options: { A: 'reserved', B: 'reservation', C: 'reservable', D: 'reserve' }, correctAnswer: 'B' },
                    { id: '109', questionText: 'Hold the tomato seedling gently by the stem in order to avoid harming ______ roots.', options: { A: 'its', B: 'at', C: 'that', D: 'in' }, correctAnswer: 'A' },
                    { id: '110', questionText: 'At the registration table, be sure to collect your name tag ______ entering the conference.', options: { A: 'very', B: 'often', C: 'always', D: 'before' }, correctAnswer: 'D' },
                    { id: '111', questionText: 'Maihama vehicles include an extended ______ to cover engine repairs.', options: { A: 'record', B: 'operation', C: 'budget', D: 'warranty' }, correctAnswer: 'D' },
                    { id: '112', questionText: "The hotel's new Web site features an ______ collection of high-quality images.", options: { A: 'absolute', B: 'efficient', C: 'impressive', D: 'undefeated' }, correctAnswer: 'C' },
                    { id: '113', questionText: 'On behalf of everyone at Uniontown Bank, we ______ thank you for your continued patronage.', options: { A: 'deservedly', B: 'commonly', C: 'sincerely', D: 'perfectly' }, correctAnswer: 'C' },
                    { id: '114', questionText: 'Fragile equipment must be stored in a secure location so that nothing is ______ damaged.', options: { A: 'accident', B: 'accidents', C: 'accidental', D: 'accidentally' }, correctAnswer: 'D' },
                    { id: '115', questionText: "Ms. Sampson will not arrive at the convention ______ after our team's presentation.", options: { A: 'until', B: 'lately', C: 'from', D: 'when' }, correctAnswer: 'A' },
                    { id: '116', questionText: 'The community picnic will be held ______ the park behind the Seltzer Public Library.', options: { A: 'in', B: 'all', C: 'for', D: 'here' }, correctAnswer: 'A' },
                    { id: '117', questionText: 'The new hires ______ for an orientation on May 10 at 9:00 A.M.', options: { A: 'to be gathering', B: 'will gather', C: 'gathering', D: 'to gather' }, correctAnswer: 'B' },
                    { id: '118', questionText: 'When Mr. Young approached the desk, the receptionist ______ offered him a seat in the waiting room.', options: { A: 'politely', B: 'polite', C: 'politeness', D: 'politest' }, correctAnswer: 'A' },
                    { id: '119', questionText: 'Members of the Marvale marketing team claimed that ______ was the best design for the new corporate logo.', options: { A: 'they', B: 'them', C: 'theirs', D: 'their' }, correctAnswer: 'C' },
                    { id: '120', questionText: 'The new Kitsuna video camera is currently on sale for $375, not ______ tax.', options: { A: 'excepting', B: 'alongside', C: 'within', D: 'including' }, correctAnswer: 'D' },
                    { id: '121', questionText: 'All associates are ______ to follow the standard operating procedures outlined in the handbook.', options: { A: 'concerned', B: 'tended', C: 'maintained', D: 'expected' }, correctAnswer: 'D' },
                    { id: '122', questionText: 'This month Framley Publishing House is embarking on its ______ expansion so far.', options: { A: 'ambitiously', B: 'most ambitiously', C: 'ambition', D: 'most ambitious' }, correctAnswer: 'D' },
                    { id: '123', questionText: "After months of collaboration, Matricks Technology's software developers ______ released a top-quality product.", options: { A: 'profoundly', B: 'overly', C: 'finally', D: 'intensely' }, correctAnswer: 'C' },
                    { id: '124', questionText: 'Tickets are valid for one-time access and do not allow for ______ into the venue.', options: { A: 'duplication', B: 'reentry', C: 'permission', D: 'turnover' }, correctAnswer: 'B' },
                    { id: '125', questionText: 'We hired Okafor Construction to do the renovation ______ it was not the lowest bidder on the project.', options: { A: 'if only', B: 'alternatively', C: 'whereas', D: 'even though' }, correctAnswer: 'D' },
                    { id: '126', questionText: 'The first ______ of the training will introduce staff to certain workplace responsibilities.', options: { A: 'part', B: 'parted', C: 'parting', D: 'partial' }, correctAnswer: 'A' },
                    { id: '127', questionText: 'According to industry ______, Ghira Company plans to relocate its headquarters to Australia.', options: { A: 'reported', B: 'reportedly', C: 'reporter', D: 'reports' }, correctAnswer: 'B' },
                    { id: '128', questionText: 'Next month, the Kneath House will host an exhibition of ______ furniture and clothing from the eighteenth century.', options: { A: 'authentic', B: 'authentically', C: 'authenticate', D: 'authenticity' }, correctAnswer: 'A' },
                    { id: '129', questionText: "PKTM's regional managers serve ______ the direction of the vice president.", options: { A: 'among', B: 'under', C: 'behind', D: 'opposite' }, correctAnswer: 'B' },
                    { id: '130', questionText: '______ a recent surge in demand, Vanita\'s Catering is hiring four additional servers.', options: { A: 'Everywhere', B: 'Possibly', C: 'In total', D: 'Owing to' }, correctAnswer: 'D' }
                ]
            }
        ]
    },
    4: {
        id: 4, 
        title: 'Part 5 - Test 4', 
        part: 5, 
        passages: [
            {
                id: 'passage-5-4-1',
                text: 'Directions: A word or phrase is missing in each of the sentences below. Four answer choices are given below each sentence. Select the best answer to complete the sentence.',
                questions: [
                    { id: '101', questionText: 'Mr. Barrientos has worked at the company ______ six years.', options: { A: 'for', B: 'since', C: 'with', D: 'lately' }, correctAnswer: 'A' },
                    { id: '102', questionText: 'The staff cafeteria stops ______ lunch at 2:00 P.M.', options: { A: 'taking', B: 'buying', C: 'serving', D: 'working' }, correctAnswer: 'C' },
                    { id: '103', questionText: 'The annual report will be ready after ______ make the necessary revisions.', options: { A: 'I', B: 'me', C: 'myself', D: 'my' }, correctAnswer: 'A' },
                    { id: '104', questionText: 'Mr. Louden was offered a full-time position at Fortelio Corporation ______ a division manager.', options: { A: 'about', B: 'as', C: 'after', D: 'around' }, correctAnswer: 'B' },
                    { id: '105', questionText: 'Kennedy Sports will ______ its end-of-season sale through the month of January.', options: { A: 'continuing', B: 'continued', C: 'continues', D: 'continue' }, correctAnswer: 'D' },
                    { id: '106', questionText: 'Ms. Najjar is going to give a presentation ______ workplace regulations at noon.', options: { A: 'near', B: 'to', C: 'past', D: 'on' }, correctAnswer: 'D' },
                    { id: '107', questionText: 'Mr. Telguld submitted the ______ surveys before the monthly board meeting.', options: { A: 'completely', B: 'completed', C: 'completing', D: 'completes' }, correctAnswer: 'B' },
                    { id: '108', questionText: 'Travel funds are available to student presenters coming to the conference from a significant _____.', options: { A: 'location', B: 'amount', C: 'reason', D: 'distance' }, correctAnswer: 'D' },
                    { id: '109', questionText: 'Ms. Okada is ______ a new social media campaign at the request of our office manager.', options: { A: 'organize', B: 'organized', C: 'organizing', D: 'organization' }, correctAnswer: 'C' },
                    { id: '110', questionText: 'The speaker will offer five tips for making wise purchasing _____.', options: { A: 'items', B: 'decisions', C: 'values', D: 'remedies' }, correctAnswer: 'B' },
                    { id: '111', questionText: 'Please log on to your online checking account ______ the next 30 days in order to keep it active.', options: { A: 'within', B: 'how', C: 'whether', D: 'and' }, correctAnswer: 'A' },
                    { id: '112', questionText: 'The Bradyville Inn ______ live jazz music in the dining area on Friday evenings.', options: { A: 'features', B: 'marks', C: 'sounds', D: 'collects' }, correctAnswer: 'A' },
                    { id: '113', questionText: "Leeann's Organic Fruit Spreads can be purchased ______ from the company's Web site.", options: { A: 'direction', B: 'directly', C: 'directness', D: 'directed' }, correctAnswer: 'B' },
                    { id: '114', questionText: "______ the event organizers' best efforts, they have been unable to attract enough volunteers this spring.", options: { A: 'Behind', B: 'Versus', C: 'Among', D: 'Despite' }, correctAnswer: 'D' },
                    { id: '115', questionText: 'Mr. Perez ______ as an industrial engineer at Gaberly Logistics for almost twenty years.', options: { A: 'employs', B: 'to be employed', C: 'is employing', D: 'has been employed' }, correctAnswer: 'D' },
                    { id: '116', questionText: "Soon after Ms. Manilla was hired, the sales department's productivity began to increase ______.", options: { A: 'mainly', B: 'respectively', C: 'noticeably', D: 'closely' }, correctAnswer: 'C' },
                    { id: '117', questionText: 'Small businesses ______ participate in the Get Ahead program will receive marketing tools to help them attract customers.', options: { A: 'that', B: 'they', C: 'what', D: 'whoever' }, correctAnswer: 'A' },
                    { id: '118', questionText: 'Our copy editors will review the manuscript ______ will not return it until the end of next week.', options: { A: 'or', B: 'once', C: 'either', D: 'but' }, correctAnswer: 'D' },
                    { id: '119', questionText: 'Mira Kumar was probably the ______ of all the interns at Kolbry Media last summer.', options: { A: 'ambitious', B: 'most ambitious', C: 'ambitiously', D: 'more ambitiously' }, correctAnswer: 'B' },
                    { id: '120', questionText: "Orbin's Fish Company expanded to a total of 26 stores ______ its takeover of a rival chain.", options: { A: 'whenever', B: 'toward', C: 'following', D: 'usually' }, correctAnswer: 'C' },
                    { id: '121', questionText: 'Ms. Cartwright told her team members that she wanted ______ to streamline the company\'s assembly process.', options: { A: 'theirs', B: 'they', C: 'them', D: 'themselves' }, correctAnswer: 'C' },
                    { id: '122', questionText: "Rupert's Food Service uses ______ technology to track all of its shipments.", options: { A: 'strict', B: 'numerous', C: 'advanced', D: 'crowded' }, correctAnswer: 'C' },
                    { id: '123', questionText: 'Our app includes a ______ so that users can determine whether they are within their budget goals.', options: { A: 'calculator', B: 'calculated', C: 'calculating', D: 'calculations' }, correctAnswer: 'A' },
                    { id: '124', questionText: 'To ______ that its facilities are cleaned every day, the Selboa Company has hired more janitors.', options: { A: 'ensure', B: 'affect', C: 'provide', D: 'secure' }, correctAnswer: 'A' },
                    { id: '125', questionText: 'During his term as a legislator, Jeremy Moran ______ promoted public awareness of the need for infrastructure improvements.', options: { A: 'act', B: 'action', C: 'active', D: 'actively' }, correctAnswer: 'D' },
                    { id: '126', questionText: "Pyxie Print's business is so new that we need to explain the full range of our services to ______ clients.", options: { A: 'trained', B: 'potential', C: 'elected', D: 'paid' }, correctAnswer: 'B' },
                    { id: '127', questionText: 'Phone orders that are ______ to local stores by 11:00 A.M. are eligible for same-day pickup.', options: { A: 'submitted', B: 'submission', C: 'submitting', D: 'submits' }, correctAnswer: 'A' },
                    { id: '128', questionText: 'An Oswald Hardware associate will ______ place an order for customers who need larger quantities than what is in stock.', options: { A: 'slightly', B: 'wholly', C: 'busily', D: 'gladly' }, correctAnswer: 'D' },
                    { id: '129', questionText: 'Mia Daushvili performed with the Bayhead Orchestra on Monday evening, ______ her virtuosic skills on the piccolo.', options: { A: 'displays', B: 'had displayed', C: 'displaying', D: 'was displayed' }, correctAnswer: 'C' },
                    { id: '130', questionText: 'When reviewing applicants for the clerk position, Ms. Ng will consider both education and ______ experience.', options: { A: 'prior', B: 'quick', C: 'lean', D: 'calm' }, correctAnswer: 'A' }
                ]
            }
        ]
    },
    5: {
        id: 5, 
        title: 'Part 5 - Test 5', 
        part: 5, 
        passages: [
            {
                id: 'passage-5-5-1',
                text: 'Directions: A word or phrase is missing in each of the sentences below. Four answer choices are given below each sentence. Select the best answer to complete the sentence.',
                questions: [
                    { id: '101', questionText: 'After upgrading to Pro Data Whiz, our clients began ______ problems with spreadsheets.', options: { A: 'has', B: 'had', C: 'have', D: 'having' }, correctAnswer: 'D' },
                    { id: '102', questionText: 'Requests for additional days off are ______ by Ms. Chung in Human Resources.', options: { A: 'approved', B: 'dropped', C: 'reached', D: 'reminded' }, correctAnswer: 'A' },
                    { id: '103', questionText: 'The programmers have a list of changes ______ the next software update.', options: { A: 'between', B: 'of', C: 'for', D: 'above' }, correctAnswer: 'C' },
                    { id: '104', questionText: 'Let Farida Banquet Service ______ professional catering for your important corporate events.', options: { A: 'providing', B: 'provide', C: 'provides', D: 'to provide' }, correctAnswer: 'B' },
                    { id: '105', questionText: 'Using various innovative techniques, Boyd Industries has improved the ______ of its tiles.', options: { A: 'closure', B: 'product', C: 'quality', D: 'method' }, correctAnswer: 'C' },
                    { id: '106', questionText: '______ of all cosmetics are final, and refunds will not be given under any circumstances.', options: { A: 'Sale', B: 'Sales', C: 'Sells', D: 'Selling' }, correctAnswer: 'B' },
                    { id: '107', questionText: 'If you have already submitted your response, no ______ action is required.', options: { A: 'bright', B: 'further', C: 'previous', D: 'average' }, correctAnswer: 'B' },
                    { id: '108', questionText: 'Ms. Sieglak stated that the app design was based on ______ own research.', options: { A: 'she', B: 'hers', C: 'her', D: 'herself' }, correctAnswer: 'C' },
                    { id: '109', questionText: '______ the organization has doubled its outreach efforts, it has yet to see an increase in new clients.', options: { A: 'Until', B: 'Because', C: 'Although', D: 'Therefore' }, correctAnswer: 'C' },
                    { id: '110', questionText: 'Starting on October 8, ______ board of education meetings will be streamed live on the school district\'s Web site.', options: { A: 'all', B: 'so', C: 'that', D: 'to' }, correctAnswer: 'A' },
                    { id: '111', questionText: 'The hairstylists at Urbanite Salon have ______ experience working with a variety of hair products.', options: { A: 'considers', B: 'considerable', C: 'considerate', D: 'considering' }, correctAnswer: 'B' },
                    { id: '112', questionText: 'Both candidates are ______ suitable for the assistant manager position.', options: { A: 'permanently', B: 'promptly', C: 'equally', D: 'gradually' }, correctAnswer: 'C' },
                    { id: '113', questionText: 'With the acquisition of Bloom Circuit, Wellstrom Hardware has ______ expanded its offerings and services.', options: { A: 'greater', B: 'greatness', C: 'great', D: 'greatly' }, correctAnswer: 'D' },
                    { id: '114', questionText: 'Please note that file names should not ______ capital letters or spaces.', options: { A: 'differ', B: 'contain', C: 'match', D: 'pick' }, correctAnswer: 'B' },
                    { id: '115', questionText: 'The Sun-Tech ceiling fan has received more than 15,000 five-star reviews from ______ customers.', options: { A: 'satisfied', B: 'checked', C: 'adjusted', D: 'allowed' }, correctAnswer: 'A' },
                    { id: '116', questionText: 'Please ______ the Returns section of our Web site if you are unhappy with any part of your order.', options: { A: 'visit', B: 'visits', C: 'visited', D: 'visiting' }, correctAnswer: 'A' },
                    { id: '117', questionText: 'Ito Auto Group is offering excellent ______ on pre-owned vehicles this month.', options: { A: 'trips', B: 'reasons', C: 'customs', D: 'deals' }, correctAnswer: 'D' },
                    { id: '118', questionText: 'Product prices are influenced ______ such factors as consumer demand and retail competition.', options: { A: 'by', B: 'under', C: 'those', D: 'nearly' }, correctAnswer: 'A' },
                    { id: '119', questionText: 'Monmouth Enterprises will be ______ prefabricated houses online starting on April 1.', options: { A: 'predicting', B: 'passing', C: 'retaining', D: 'marketing' }, correctAnswer: 'D' },
                    { id: '120', questionText: 'All employees should familiarize ______ with the company\'s policies and procedures.', options: { A: 'their', B: 'them', C: 'theirs', D: 'themselves' }, correctAnswer: 'D' },
                    { id: '121', questionText: 'Custom furniture orders require a 50 percent deposit ______ the time of the order.', options: { A: 'as', B: 'off', C: 'into', D: 'at' }, correctAnswer: 'D' },
                    { id: '122', questionText: "We are planning a ______ for the Klemner Corporation's twentieth anniversary.", options: { A: 'celebration', B: 'celebrated', C: 'celebrity', D: 'celebrate' }, correctAnswer: 'A' },
                    { id: '123', questionText: 'Though she lacks political experience, Ms. Diaz has been ______ impressive in her first term as mayor.', options: { A: 'quite', B: 'soon', C: 'ever', D: 'next' }, correctAnswer: 'A' },
                    { id: '124', questionText: 'The university library usually acquires ______ copies of best-selling books to meet students\' demand.', options: { A: 'multiply', B: 'multiple', C: 'multiples', D: 'multiplicity' }, correctAnswer: 'B' },
                    { id: '125', questionText: "This year's conference tote bags were ______ donated by Etani Designs.", options: { A: 'generous', B: 'generosity', C: 'generously', D: 'generosities' }, correctAnswer: 'C' },
                    { id: '126', questionText: 'We will be holding a ______ on Friday to honor the 30-year engineering career of Mr. Kuan.', options: { A: 'record', B: 'share', C: 'reception', D: 'place' }, correctAnswer: 'C' },
                    { id: '127', questionText: 'Groove Background creates soothing playlists of instrumental music, ______ classical and jazz.', options: { A: 'instead', B: 'including', C: 'in addition', D: 'indeed' }, correctAnswer: 'B' },
                    { id: '128', questionText: "Members of the finance department ______ to Mr. Chua's lecture on risk avoidance.", options: { A: 'to be invited', B: 'inviting', C: 'invite', D: 'are invited' }, correctAnswer: 'D' },
                    { id: '129', questionText: 'The board of trustees debated for hours ______ the revised hiring policies.', options: { A: 'during', B: 'above', C: 'over', D: 'across' }, correctAnswer: 'C' },
                    { id: '130', questionText: "The participants closely ______ the fitness instructor's movements tend to learn the proper technique more quickly.", options: { A: 'imitate', B: 'imitations', C: 'imitative', D: 'imitating' }, correctAnswer: 'D' }
                ]
            }
        ]
    }
};