import { GrammarQuestion } from '../../types';

export const verbQuizzes: Record<string, GrammarQuestion[]> = {
    "Bài tập 1": [
        { id: 'verb-400-1', questionText: "By the end of last week, she _________ all her tasks.", options: { A: 'finishes', B: 'had finished', C: 'has finished', D: 'is finishing' }, correctAnswer: 'B', explanation: "Giải thích: Việc cô ấy hoàn thành hết công việc ( she had finished all her tasks) là việc xảy ra trước một thời điểm trong quá khứ (By the end of last week), do đó câu này cần sử dụng thì Quá khứ hoàn thành. Ở đây, cô ấy đã hoàn thành hết công việc trước cuối tuần vừa rồi." },
        { id: 'verb-400-2', questionText: "We often _________ meetings on Mondays.", options: { A: 'have', B: 'has', C: 'will be having', D: 'has had' }, correctAnswer: 'A', explanation: "Giải thích: Việc nhóm nhân vật “chúng tôi” thường xuyên có các cuộc họp vào thứ Hai (We often have meetings on Mondays) là hành động lặp đi lặp lại, vì vậy câu này sử dụng thì Hiện tại đơn. Với chủ ngữ là “we” là số nhiều thì giữ nguyên động từ." },
        { id: 'verb-400-3', questionText: "I _________ my new job at the company on Sixth Street.", options: { A: 'has just started', B: 'will just start', C: 'will just have started', D: 'have just started' }, correctAnswer: 'D', explanation: "Giải thích: “Just” (vừa mới) là trạng từ báo hiệu thì Hiện tại hoàn thành, vì vậy câu này đang diễn tả một hành động vừa mới hoàn thành. Ở đây nhân vật “tôi” vừa bắt đầu công việc mới tại công ty trên phố Sixth. Với chủ ngữ là “I” thì trợ động từ phải là have." },
        { id: 'verb-400-4', questionText: "She _________ a coworker with a task yesterday when the blackout happened.", options: { A: 'helped', B: 'was helping', C: 'will help', D: 'helps' }, correctAnswer: 'B', explanation: "Giải thích: Việc cô ấy đang giúp đồng nghiệp với một nhiệm vụ vào ngày hôm qua (She was helping a coworker with a task yesterday) bị gián đoạn bởi một hành động khác trong quá khứ (when the blackout happened), và hành động làm gián đoạn này được chia theo thì Quá khứ đơn, vì vậy hành động bị gián đoạn sẽ sử dụng thì Quá khứ tiếp diễn. Ở đây, hôm qua, cô ấy đang giúp đỡ đồng nghiệp với một nhiệm vụ nọ thì mất điện. Với chủ ngữ là “she” thì be được chia về “was”." },
        { id: 'verb-400-5', questionText: "Our employees _________ a team lunch last Friday.", options: { A: 'had', B: 'has had', C: 'was having', D: 'are having' }, correctAnswer: 'A', explanation: "Giải thích: “Last Friday” (thứ Sáu tuần trước) là một thời điểm trong quá khứ, vì vậy câu này đang diễn tả một hành động đã hoàn thành trong quá khứ, và do đó cần sử dụng thì Quá khứ đơn. Ở đây, nhân viên đã có một bữa trưa tập thể vào thứ Sáu tuần trước." },
        { id: 'verb-400-6', questionText: "She _________ five different countries in the last two years.", options: { A: 'visit', B: 'visits', C: 'is visiting', D: 'has visited' }, correctAnswer: 'D', explanation: "Giải thích: Việc cô ấy đã đến 5 quốc gia khác nhau trong 2 năm vừa qua (She has visited five different countries in the last two years) diễn tả kinh nghiệm, trải nghiệm trong quá khứ, vì thế câu này sử dụng thì Hiện tại hoàn thành. Với chủ ngữ là “she” là số ít thì trợ động từ phải là “has”." },
        { id: 'verb-400-7', questionText: "We _________ a company picnic next month.", options: { A: 'have', B: 'is having', C: 'will have', D: 'will has' }, correctAnswer: 'C', explanation: "Giải thích: “Tháng sau” (Next month) là một thời điểm trong tương lai, vì vậy câu này đang diễn tả một hành động sẽ xảy ra trong tương lai, và do đó cần sử dụng thì Tương lai đơn. Ở đây, tháng sau nhóm nhân vật “chúng tôi” sẽ có một buổi dã ngoại cùng toàn thể công ty." },
        { id: 'verb-400-8', questionText: "They _________ feedback on their project yet.", options: { A: 'have not received', B: 'not received', C: 'have received', D: 'has not received' }, correctAnswer: 'A', explanation: "Giải thích: “Yet” (chưa) là trạng từ báo hiệu thì Hiện tại hoàn thành, vì vậy câu này đang diễn tả một hành động đã hoàn thành trong quá khứ và vẫn có ảnh hưởng hay kết quả có thể thấy được ở hiện tại. Ở đây, họ chưa nhận được nhận xét về dự án của mình. Với chủ ngữ là “they” là số nhiều thì trợ động từ phải là have." },
        { id: 'verb-400-9', questionText: "She _________ her report at this time next week.", options: { A: 'presents', B: 'presenting', C: 'will be presenting', D: 'presented' }, correctAnswer: 'C', explanation: "Giải thích: “This time next week” (vào thời gian này tuần sau) là một trạng từ chỉ thời gian cụ thể báo hiệu thì Tương lai tiếp diễn, vì vậy câu này đang diễn tả một hành động sẽ đang xảy ra ở một thời điểm xác định trong tương lai. Ở đây, cô ấy sẽ trình bày bản báo cáo của mình vào thời gian này tuần sau." },
        { id: 'verb-400-10', questionText: "She _________ to a customer on the phone right now.", options: { A: 'talks', B: 'was talking', C: 'are talking', D: 'is talking' }, correctAnswer: 'D', explanation: "Giải thích: Right now” (ngay bây giờ) là trạng từ chỉ thời gian báo hiệu thì Hiện tại tiếp diễn, vì vậy câu này đang diễn tả một hành động đang xảy ra tại thời điểm hiện tại. Ở đây, cô ấy đang nói chuyện điện thoại với khách hàng ngay bây giờ. Với chủ ngữ là “she” là số ít thì be được chia về “is”." },
        { id: 'verb-400-11', questionText: "When I came into the office late this morning, the conference _________ .", options: { A: 'already started', B: 'had already started', C: 'has already started', D: 'already starts' }, correctAnswer: 'B', explanation: "Giải thích: Việc hội thảo đã bắt đầu (the conference had already started) là việc xảy ra trước một hành động khác trong quá khứ (I came into the office late this morning), do đó câu này cần sử dụng thì Quá khứ hoàn thành. Ở đây, nhân vật “tôi” tới văn phòng muộn sáng nay thì hội thảo đã được bắt đầu từ trước." },
        { id: 'verb-400-12', questionText: "By the end of the day, I _________ my report.", options: { A: 'will has completed', B: 'will have completed', C: 'completed', D: 'complete' }, correctAnswer: 'B', explanation: "Giải thích: Việc nhân vật “tôi” hoàn thành (complete) bài báo cáo của mình (my report) sẽ đã được hoàn thành trước một thời điểm trong tương lai, là cuối ngày hôm nay (By the end of the day), do đó câu này cần sử dụng thì Tương lai hoàn thành. Ở đây, tôi sẽ đã hoàn thành bài báo cáo trước cuối ngày hôm nay." },
        { id: 'verb-400-13', questionText: "She _________ her previous job last month.", options: { A: 'leaves', B: 'leave', C: 'left', D: 'will leave' }, correctAnswer: 'C', explanation: "Giải thích: “Last month” (tháng trước) là một thời điểm trong quá khứ, vì vậy câu này đang diễn tả một hành động đã hoàn thành trong quá khứ, và do đó cần sử dụng thì Quá khứ đơn. Ở đây, cô ấy đã nghỉ việc tại chỗ làm cũ vào tháng trước." },
        { id: 'verb-400-14', questionText: "Lena usually _________ at work at 8 a.m.", options: { A: 'arrive', B: 'will arrive', C: 'arrives', D: 'has arrived' }, correctAnswer: 'C', explanation: "Giải thích: Việc Lena thường xuyên đến chỗ làm vào lúc 8 giờ sáng (Lena usually arrives at work at 8 a.m.) là hành động lặp đi lặp lại, vì vậy câu này sử dụng thì Hiện tại đơn. Với chủ ngữ là “Lena” là số ít nên cần chia “arrive” thành “arrives”." },
        { id: 'verb-400-15', questionText: "I _________ an email when the phone rang.", options: { A: 'was typing', B: 'typed', C: 'have typed', D: 'will type' }, correctAnswer: 'A', explanation: "Giải thích: Việc nhân vật “tôi” đang soạn thảo một email (I was typing an email) bị gián đoạn bởi một hành động khác trong quá khứ (when the phone rang), và hành động làm gián đoạn này được chia theo thì Quá khứ đơn, vì vậy hành động bị gián đoạn sẽ sử dụng thì Quá khứ tiếp diễn. Ở đây, “tôi” đang soạn thảo email thì chuông điện thoại reo. Với chủ ngữ là “I” thì be được chia về “was”." },
    ],
    "Bài tập 2": [
        { id: 'verb-500-1', questionText: "The manager, along with his team, ______ working on the project tirelessly.", options: { A: 'is', B: 'are', C: 'been', D: 'be' }, correctAnswer: 'A', explanation: "Câu hoàn chỉnh: The manager, along with his team, is working on the project tirelessly. (Người quản lý cùng với đội nhóm của anh ấy đang làm việc không mệt mỏi cho dự án.)\nGiải thích: trong câu này, chủ ngữ gồm 2 nhóm đối tượng là “The manager” và “his team” được nối với nhau bởi cụm từ “along with”. Theo quy tắc, động từ chính sẽ được chia theo danh từ đứng trước cụm giới từ là “The manager” (danh từ số ít) nên động từ chính cũng được dùng ở dạng số ít là “is working”." },
        { id: 'verb-500-2', questionText: "Every member of the staff ______ received a copy of the new policy.", options: { A: 'has', B: 'have been', C: 'were', D: 'was' }, correctAnswer: 'A', explanation: "Câu hoàn chỉnh: Every member of the staff has received a copy of the new policy. (Mỗi thành viên của đội ngũ nhân viên đã nhận được một bản sao của chính sách mới.)\nGiải thích: vì chủ ngữ “Every member of the staff” bao gồm từ 'Every' và danh từ số ít 'member of the staff' cho nên theo quy tắc thì động từ theo sau phải được chia ở dạng số ít (has received) để phù hợp với chủ ngữ này." },
        { id: 'verb-500-3', questionText: "The majority of the employees ______ in favor of the new working hours.", options: { A: 'are', B: 'is', C: 'am', D: 'been' }, correctAnswer: 'A', explanation: "Câu hoàn chỉnh: The majority of the employees are in favor of the new working hours. (Đa số người lao động ủng hộ giờ làm việc mới.)\nGiải thích: Chủ ngữ 'The majority of the employees ' bắt đầu bằng cụm từ 'The majority of' và kết hợp với danh từ đếm được số nhiều 'the employees', cho nên động từ tobe được sử dụng ở dạng số nhiều là “are”." },
        { id: 'verb-500-4', questionText: "One of the files on my desk ______ missing.", options: { A: 'were', B: 'are', C: 'is', D: 'been' }, correctAnswer: 'C', explanation: "Câu hoàn chỉnh: One of the files on my desk is missing. (Một trong những hồ sơ trên bàn của tôi bị thiếu.)\nGiải thích: chủ ngữ bắt đầu bằng cụm từ 'one of' và kết hợp với danh từ số nhiều 'the files' nên động từ tobe theo sau phải sử dụng ở dạng số ít là “is” để phù hợp với chủ ngữ này." },
        { id: 'verb-500-5', questionText: "The number of complaints about the system ______ increasing.", options: { A: 'have been', B: 'are', C: 'is', D: 'been' }, correctAnswer: 'C', explanation: "Câu hoàn chỉnh: The number of complaints about the system is increasing. (Số lượng khiếu nại về hệ thống ngày càng tăng)\nGiải thích: câu được bắt đầu bằng “the number of + Danh từ đếm được số nhiều (complaints) nên theo quy tắc phải sử dụng động từ ở dạng số ít là “is increasing” để hòa hợp với chủ ngữ." },
        { id: 'verb-500-6', questionText: "The quality of the products ______ improved significantly.", options: { A: 'has', B: 'have', C: 'is', D: 'are going to' }, correctAnswer: 'A', explanation: "Câu hoàn chỉnh: The quality of the products has improved significantly. (Chất lượng sản phẩm đã được cải thiện đáng kể.)\nGiải thích: Chủ ngữ 'The quality of the products' bao gồm nhiều thành phần, nhưng danh từ chính là 'The quality' - một danh từ không đếm được. Do đó, động từ theo sau được sử dụng ở dạng số ít để đảm bảo sự hòa hợp với chủ ngữ." },
        { id: 'verb-500-7', questionText: "Every computer in the office ______ equipped with the latest software.", options: { A: 'be', B: 'are', C: 'is', D: 'were' }, correctAnswer: 'C', explanation: "Câu hoàn chỉnh: Every computer in the office is equipped with the latest software. (Mỗi máy tính trong văn phòng đều được trang bị phần mềm mới nhất.)\nGiải thích: chủ ngữ “Every computer” là một danh từ số ít, cho nên động từ theo sau phải được chia ở dạng số ít (is equipped with) để phù hợp với chủ ngữ này." },
        { id: 'verb-500-8', questionText: "Neither of the interns ______ familiar with the new software.", options: { A: 'is', B: 'have been', C: 'are', D: 'will be' }, correctAnswer: 'A', explanation: "Câu hoàn chỉnh: Neither of the interns is familiar with the new software. (Cả hai thực tập sinh đều không quen thuộc với phần mềm mới.)\nGiải thích: do chủ ngữ bắt đầu bằng cụm 'neither of' nên động từ tobe được chia theo hình thức số ít là “is”." },
        { id: 'verb-500-9', questionText: "The employees, along with their manager, ______ been working overtime.", options: { A: 'has', B: 'have', C: 'are', D: 'is' }, correctAnswer: 'B', explanation: "Câu hoàn chỉnh: The employees, along with their manager, have been working overtime. (Các nhân viên, cùng với người quản lý của họ, đã làm việc ngoài giờ.)\nGiải thích: trong câu này, chủ ngữ gồm 2 nhóm đối tượng là “The employees” và “their manager” được nối với nhau bởi cụm từ “along with”. Theo quy tắc, động từ chính sẽ được chia theo danh từ đứng trước cụm giới từ là “The employees” (danh từ số nhiều) nên động từ chính cũng được dùng ở dạng số nhiều là “have been working”." },
        { id: 'verb-500-10', questionText: "Neither the printer nor the scanner ______ working properly.", options: { A: 'are', B: 'be', C: 'is', D: 'being' }, correctAnswer: 'C', explanation: "Câu hoàn chỉnh: Neither the printer nor the scanner is working properly. (Cả máy in và máy quét đều không hoạt động bình thường.)\nGiải thích: Trong câu này, danh từ thứ hai sau 'nor' là 'the scanner' (một danh từ số ít), do đó, động từ chính được chia theo danh từ này mà ở hình thức số ít là “is working”." },
        { id: 'verb-500-11', questionText: "All of the equipment ______ in working condition.", options: { A: 'are', B: 'be', C: 'is', D: 'being' }, correctAnswer: 'C', explanation: "Câu hoàn chỉnh: All of the equipment is in working condition. (Tất cả các thiết bị đều trong tình trạng hoạt động.)\nGiải thích: chủ ngữ bắt đầu bằng cụm từ 'all of' và kết hợp với danh từ không đếm được 'equipment' nên động từ tobe theo sau phải sử dụng ở dạng số ít là “is” để phù hợp với chủ ngữ này." },
        { id: 'verb-500-12', questionText: "The manager often _____ the progress reports.", options: { A: 'review', B: 'reviewed', C: 'reviewing', D: 'reviews' }, correctAnswer: 'D', explanation: "Câu hoàn chỉnh: The manager often reviews the progress reports. (Người quản lý thường xuyên xem xét các báo cáo tiến độ.)\nGiải thích: trong câu trên, chủ ngữ “The manager” là một danh từ số ít nên động từ chính theo sau phải sử dụng ở dạng số ít là “reviews” để phù hợp với chủ ngữ này." },
        { id: 'verb-500-13', questionText: "The office manager, along with the assistants, ___ schedules.", options: { A: 'is coordinating', B: 'are coordinating', C: 'coordinating', D: 'coordinate' }, correctAnswer: 'A', explanation: "Câu hoàn chỉnh: The office manager, along with the assistants, is coordinating schedules. (Giám đốc văn phòng cùng với những người trợ lý đang điều phối lịch trình.)\nGiải thích: trong câu này, chủ ngữ gồm 2 nhóm đối tượng là “The office manager” và “the assistants” được nối với nhau bởi cụm từ “along with”. Theo quy tắc, động từ chính sẽ được chia theo danh từ đứng trước cụm giới từ là “The office manager” (danh từ số ít) nên động từ chính cũng được dùng ở dạng số ít là “is coordinating”." },
        { id: 'verb-500-14', questionText: "Ten years ___ a significant amount of time to devote to a project.", options: { A: 'were', B: 'have been', C: 'be', D: 'is' }, correctAnswer: 'D', explanation: "Câu hoàn chỉnh: Ten years is a significant amount of time to devote to a project. (Mười năm là một khoảng thời gian đáng kể để cống hiến cho một dự án.)\nGiải thích: do chủ ngữ là một cụm từ chỉ một khoảng thời gian nhất định (10 năm) nên theo quy tắc, cụm từ này được xem là một chủ từ số ít được đi kèm cùng động từ tobe ở dạng số ít là “is”." },
        { id: 'verb-500-15', questionText: "You and your friends ___ selected for the team.", options: { A: 'been', B: 'have been', C: 'has been', D: 'being' }, correctAnswer: 'B', explanation: "Câu hoàn chỉnh: You and your friends have been selected for the team. (Bạn và bạn bè của bạn đã được chọn vào đội.)\nGiải thích: chủ ngữ “You and your friends” bao gồm nhiều chủ thể được nối với nhau bằng liên từ 'AND', cho nên động từ chính ở dạng số nhiều 'have been selected'." },
        { id: 'verb-500-16', questionText: "The flowers in the garden ___ to be watered twice a week.", options: { A: 'needing', B: 'needs', C: 'need', D: 'be needed' }, correctAnswer: 'C', explanation: "Câu hoàn chỉnh: The flowers in the garden need to be watered twice a week. (Hoa trong vườn cần được tưới nước hai lần một tuần.)\nGiải thích: Chủ ngữ 'The flowers” là một danh từ đếm được số nhiều. Động từ 'need' được sử dụng ở dạng số nhiều để đảm bảo sự hòa hợp với chủ ngữ." },
        { id: 'verb-500-17', questionText: "The homeless ___ to find shelter and basic necessities.", options: { A: 'struggle', B: 'struggles', C: 'struggling', D: 'been struggled' }, correctAnswer: 'A', explanation: "Câu hoàn chỉnh: The homeless struggle to find shelter and basic necessities. (Những người vô gia cư đang vật lộn để tìm nơi trú ẩn và các nhu yếu phẩm cơ bản.)\nGiải thích: do chủ ngữ bắt đầu bằng 'The + adj' (the homeless) nên theo quy tắc, động từ theo sau được sử dụng ở dạng số nhiều là “struggle”." },
        { id: 'verb-500-18', questionText: "Diabetes ___ a chronic condition that affects blood sugar levels.", options: { A: 'being', B: 'are', C: 'is', D: 'be' }, correctAnswer: 'C', explanation: "Câu hoàn chỉnh: Diabetes is a chronic condition that affects blood sugar levels. (Bệnh tiểu đường là một tình trạng mãn tính ảnh hưởng đến mức đường huyết.)\nGiải thích: do chủ ngữ là tên riêng của một căn bệnh nên động từ theo sau được sử dụng ở dạng số ít là “is”." },
        { id: 'verb-500-19', questionText: "The association ___ dedicated to promoting environmental conservation.", options: { A: 'being', B: 'are', C: 'is', D: 'be' }, correctAnswer: 'C', explanation: "Câu hoàn chỉnh: The association is dedicated to promoting environmental conservation. (Hiệp hội này được dành riêng để thúc đẩy bảo tồn môi trường.)\nGiải thích: chủ ngữ 'The association' là một danh từ tập hợp nên nên động từ chính sẽ được dùng ở dạng số ít là “is”." },
        { id: 'verb-500-20', questionText: "Either the blue shirt or the white one ___ well with those pants.", options: { A: 'goes', B: 'go', C: 'gone', D: 'going' }, correctAnswer: 'A', explanation: "Câu hoàn chỉnh: Either the blue shirt or the white one goes well with those pants. (Áo sơ mi xanh hay trắng đều hợp với quần đó.)\nGiải thích:Trong câu này, danh từ thứ hai sau 'or' là 'the white one' ( một danh từ số ít), do đó, động từ chính được chia theo danh từ này mà ở hình thức số ít là “goes”." },
        { id: 'verb-500-21', questionText: "Ten percent of the office tasks ___ special attention.", options: { A: 'requires', B: 'require', C: 'requiring', D: 'been required' }, correctAnswer: 'B', explanation: "Câu hoàn chỉnh: Ten percent of the office tasks require special attention. (Mười phần trăm các nhiệm vụ văn phòng đòi hỏi sự chú ý đặc biệt.)\nGiải thích: theo quy tắc, chủ ngữ là một phân số hoặc phần trăm thì động từ chính trong câu sẽ phụ thuộc vào danh từ gắn liền với chúng. Ở câu trên, danh từ gắn liền với phần trăm là danh từ số nhiều (the office tasks) nên động từ điền vào chỗ trống sẽ ở dạng số nhiều là “require”." },
        { id: 'verb-500-22', questionText: "Her belongings ___ neatly packed in the suitcase.", options: { A: 'are', B: 'is', C: 'be', D: 'been' }, correctAnswer: 'A', explanation: "Câu hoàn chỉnh: Her belongings are neatly packed in the suitcase. (Đồ đạc của cô được đóng gói gọn gàng trong vali.)\nGiải thích: danh từ “belongings” (đồ đạc, hành lý) là danh từ luôn đi kèm với động từ số nhiều, cho nên động từ tobe “are” được sử dụng trong câu." },
        { id: 'verb-500-23', questionText: "Why the budget was exceeded ___ explained.", options: { A: 'have not been', B: 'has not been', C: 'been', D: 'being' }, correctAnswer: 'B', explanation: "Câu hoàn chỉnh: Why the budget was exceeded has not been explained. (Tại sao ngân sách bị vượt quá vẫn chưa được giải thích.)\nGiải thích: vì chủ ngữ của câu (Why the budget was exceeded) là một mệnh đề nên động từ theo sau mệnh đề phải được dùng ở dạng số ít là “has not been explained”." },
        { id: 'verb-500-24', questionText: "Many tasks ___ to be prioritized based on their urgency.", options: { A: 'needing', B: 'needs', C: 'need', D: 'be needed' }, correctAnswer: 'C', explanation: "Câu hoàn chỉnh: Many tasks need to be prioritized based on their urgency. (Nhiều nhiệm vụ cần được ưu tiên dựa trên mức độ khẩn cấp của chúng.)\nGiải thích: chủ ngữ 'Many tasks' là danh từ số nhiều cho nên động từ theo sau phải được chia ở dạng số nhiều (need) để phù hợp với chủ ngữ này." },
        { id: 'verb-500-25', questionText: "The majority of the employees ___ flexible working hours.", options: { A: 'was prefered', B: 'prefering', C: 'prefer', D: 'prefers' }, correctAnswer: 'C', explanation: "Câu hoàn chỉnh: The majority of the employees prefer flexible working hours. (Phần lớn nhân viên thích thời gian làm việc linh hoạt.)\nGiải thích: chủ ngữ bắt đầu bằng cụm từ 'The majority of' và kết hợp với danh từ số nhiều 'the employees' nên động từ theo sau phải sử dụng ở dạng số nhiều là “prefer” để phù hợp với chủ ngữ này." },
        { id: 'verb-500-26', questionText: "The team, along with their coach, ___ diligently for the upcoming tournament.", options: { A: 'practices', B: 'practice', C: 'were practicing', D: 'is practiced' }, correctAnswer: 'A', explanation: "Câu hoàn chỉnh: The team, along with their coach, practices diligently for the upcoming tournament. (Toàn đội cùng với huấn luyện viên đang chăm chỉ luyện tập cho giải đấu sắp tới.)\nGiải thích: trong câu này, chủ ngữ gồm 2 nhóm đối tượng là “The team” và “ their coach” được nối với nhau bởi cụm từ “along with”. Theo quy tắc, động từ chính sẽ được chia theo danh từ đứng trước cụm giới từ là “The team” (danh từ tập hợp) nên động từ chính sẽ được dùng ở dạng số ít là “practices”." },
        { id: 'verb-500-27', questionText: "Three-fourths of the project ___ already finished.", options: { A: 'is', B: 'are', C: 'have been', D: 'be' }, correctAnswer: 'A', explanation: "Câu hoàn chỉnh: Three-fourths of the project is already finished. (Ba phần tư dự án đã hoàn thành.)\nGiải thích: do phân số gắn liền với danh từ số ít (the project) nên động từ chính theo sau được chia ở dạng số ít là “is already finished”." },
        { id: 'verb-500-28', questionText: "None of the data ___ the hypothesis put forward by the researcher.", options: { A: 'support', B: 'supports', C: 'supporting', D: 'was supported' }, correctAnswer: 'B', explanation: "Câu hoàn chỉnh: None of the data supports the hypothesis put forward by the researcher. (Không có dữ liệu nào ủng hộ giả thuyết mà nhà nghiên cứu đưa ra.)\nGiải thích: do sau none of là một danh từ không đếm được (data) nên động từ theo sau sẽ chia theo số ít để đảm bảo sự hòa hợp với chủ ngữ." },
        { id: 'verb-500-29', questionText: "Neither the supervisor nor the employees __________ satisfied with the current work conditions.", options: { A: 'is', B: 'are', C: 'has been', D: 'be' }, correctAnswer: 'B', explanation: "Câu hoàn chỉnh: Neither the supervisor nor the employees are satisfied with the current work conditions. (Cả người giám sát và nhân viên đều không hài lòng với điều kiện làm việc hiện tại.)\nGiải thích: Trong câu này, do chủ ngữ của câu bắt đầu bằng cấu trúc ngữ pháp “neither…nor…” mà danh từ thứ hai sau 'nor' là 'the employees ' (một danh từ số nhiều), do đó, theo quy tắc thì động từ tobe sẽ được chia theo danh từ này sẽ ở hình thức số nhiều là “are”." },
        { id: 'verb-500-30', questionText: "One-fourths of the revenue _____ towards research and development.", options: { A: 'going', B: 'gone', C: 'go', D: 'goes' }, correctAnswer: 'D', explanation: "Câu hoàn chỉnh: One-fourths of the revenue goes towards research and development. (Một phần tư doanh thu dành cho nghiên cứu và phát triển.)\nGiải thích: do phân số gắn liền với danh từ không đếm được (the revenue) nên động từ chính theo sau được chia ở dạng số ít là “goes”" },
    ],
    "Bài tập 3": [
        {
            id: 'verb-600-1',
            questionText: 'The First Street Hotel has almost always been fully booked since it ------- last year.',
            options: { A: 'had renovated', B: 'renovated', C: 'was renovating', D: 'was renovated' },
            correctAnswer: 'D',
            explanation: "The hotel is the object of the renovation, so passive voice is needed ('was renovated'). The action happened at a specific time in the past ('last year'), so simple past tense is correct."
        },
        {
            id: 'verb-600-2',
            questionText: 'Ramirez Instruments ------ high-quality acoustic guitars for over a century.',
            options: { A: 'to be designed', B: 'has been designing', C: 'was designed', D: 'is designing' },
            correctAnswer: 'B',
            explanation: "The phrase 'for over a century' indicates a duration that started in the past and continues to the present. The present perfect continuous ('has been designing') emphasizes this ongoing action."
        },
        {
            id: 'verb-600-3',
            questionText: 'The senior manager, Mr. Redmayne, ------- all of the statistics that were needed for the report.',
            options: { A: 'provided', B: 'provide', C: 'to provide', D: 'providing' },
            correctAnswer: 'A',
            explanation: "This sentence describes a single, completed action in the past. The simple past tense ('provided') is the correct choice."
        },
        {
            id: 'verb-600-4',
            questionText: 'From 11 P.M. on May 3 to 8:00 A.M. on May 4, the online purchasing system ------- while we complete maintenance for the launch of the updated version.',
            options: { A: 'will be suspended', B: 'was suspended', C: 'is suspended', D: 'to suspend' },
            correctAnswer: 'A',
            explanation: "The specified time frame is in the future. The system is the recipient of the action 'suspend', so the passive voice is required. The future passive ('will be suspended') is the correct form."
        },
        {
            id: 'verb-600-5',
            questionText: "A new list of employee phone numbers will ------- on the intranet next Wednesday.",
            options: { A: 'post', B: 'to be posted', C: 'posts', D: 'be posted' },
            correctAnswer: 'D',
            explanation: "After a modal verb like 'will', the base form of the verb follows. Since the 'list' is the object being acted upon, the passive voice is needed. The structure is 'will + be + past participle' ('be posted')."
        },
        {
            id: 'verb-600-6',
            questionText: 'Our company policy requires employees ------- in accordance with federal safety regulations at all times.',
            options: { A: 'acting', B: 'acted', C: 'are acting', D: 'to act' },
            correctAnswer: 'D',
            explanation: "The verb 'require' follows the common structure: require + object (employees) + to-infinitive (to act)."
        },
        {
            id: 'verb-600-7',
            questionText: 'The renovated office building did not look the way Ms. Garcia ------ it would.',
            options: { A: 'imagine', B: 'imagining', C: 'imagined', D: 'imagination' },
            correctAnswer: 'C',
            explanation: "The main clause is in the past tense ('did not look'). The verb describing Ms. Garcia's prior thought or expectation should also be in the past tense ('imagined')."
        },
        {
            id: 'verb-600-8',
            questionText: 'A second order for 500 recycled paper cups ------ last week.',
            options: { A: 'was placed', B: 'was placing', C: 'to place', D: 'placed' },
            correctAnswer: 'A',
            explanation: "The time marker 'last week' indicates the simple past tense. The 'order' did not perform the action; it was the object of the action 'place'. Therefore, the passive voice is necessary ('was placed')."
        },
        {
            id: 'verb-600-9',
            questionText: "Join us for dinner on Friday ------ Mr. Yi's promotion to Vice President of Marketing.",
            options: { A: 'to celebrate', B: 'celebrates', C: 'will celebrate', D: 'celebrated' },
            correctAnswer: 'A',
            explanation: "The infinitive of purpose ('to celebrate') is used to explain the reason or purpose of the main action ('Join us for dinner'). It answers the question 'Why?'."
        },
        {
            id: 'verb-600-10',
            questionText: 'Profits at Talhee Beverage Co. rose about 4 percent last year, according to new figures ------ by the company.',
            options: { A: 'to release', B: 'releasing', C: 'released', D: 'have released' },
            correctAnswer: 'C',
            explanation: "This is a reduced passive relative clause. The past participle 'released' modifies 'figures'. The full, unreduced clause would be '...new figures that were released by the company'."
        },
        {
            id: 'verb-600-11',
            questionText: "The National Health Agency's latest report ------ that recently adopted health-care regulations have been successful.",
            options: { A: 'concludes', B: 'concluding', C: 'conclusion', D: 'to conclude' },
            correctAnswer: 'A',
            explanation: "The simple present tense ('concludes') is used to state the findings or content of a report, document, or study. The subject 'report' is singular."
        },
        {
            id: 'verb-600-12',
            questionText: 'We cannot ------- the filming of our documentary, Morning after Night, without sufficient funding.',
            options: { A: 'completely', B: 'completion', C: 'complete', D: 'completing' },
            correctAnswer: 'C',
            explanation: "After a modal verb like 'cannot', the base form of the main verb is required. 'complete' is the base form."
        },
        {
            id: 'verb-600-13',
            questionText: 'If Ms. Cho ------- the contract sooner, we would have been able to begin work immediately.',
            options: { A: 'signs', B: 'signed', C: 'had signed', D: 'was signing' },
            correctAnswer: 'C',
            explanation: "This is a third conditional sentence, used for hypothetical situations in the past. The 'if' clause requires the past perfect tense ('had signed')."
        },
        {
            id: 'verb-600-14',
            questionText: 'Mr. Evans ------- to his current position as CFO after successfully managing three major mergers.',
            options: { A: 'was promoting', B: 'was promoted', C: 'promotes', D: 'to promote' },
            correctAnswer: 'B',
            explanation: "Mr. Evans was the recipient of the promotion, not the one performing the action. Therefore, the passive voice is needed. The action is in the past, so simple past passive ('was promoted') is correct."
        },
        {
            id: 'verb-600-15',
            questionText: 'Since the new software update, employees ------- fewer errors in data entry.',
            options: { A: 'made', B: 'are making', C: 'have been making', D: 'had made' },
            correctAnswer: 'C',
            explanation: "The word 'Since' indicates a point in the past when an action started and has continued until now. The present perfect continuous ('have been making') is used to emphasize this ongoing trend."
        },
        {
            id: 'verb-600-16',
            questionText: 'The committee recommended ------- the company logo to reflect a more modern image.',
            options: { A: 'change', B: 'to change', C: 'changing', D: 'changed' },
            correctAnswer: 'C',
            explanation: "The verb 'recommend' is followed by a gerund ('changing') when it is used in this structure."
        },
        {
            id: 'verb-600-17',
            questionText: 'Before ------- the proposal, the board of directors must review the financial forecasts.',
            options: { A: 'to approve', B: 'approving', C: 'approved', D: 'is approved' },
            correctAnswer: 'B',
            explanation: "After a preposition like 'Before', the gerund form of the verb ('approving') is required."
        },
        {
            id: 'verb-600-18',
            questionText: 'The latest technical documentation ------- in a digital format for easy access by all team members.',
            options: { A: 'is publishing', B: 'is published', C: 'publishes', D: 'have published' },
            correctAnswer: 'B',
            explanation: "The documentation is the object being published, so the passive voice is needed. The simple present passive ('is published') is used to describe a general state or fact."
        },
        {
            id: 'verb-600-19',
            questionText: 'The two managers agreed ------- the project’s budget constraints before the next meeting.',
            options: { A: 'discussing', B: 'discussed', C: 'to discuss', D: 'discuss' },
            correctAnswer: 'C',
            explanation: "The verb 'agree' is followed by the to-infinitive form of the next verb ('to discuss')."
        },
        {
            id: 'verb-600-20',
            questionText: 'The old security system ------- with new digital cameras and alarm sensors next month.',
            options: { A: 'is replacing', B: 'replaces', C: 'to be replaced', D: 'will be replaced' },
            correctAnswer: 'D',
            explanation: "The time marker 'next month' indicates a future action. The 'system' is the object being replaced, so the future passive voice ('will be replaced') is correct."
        }
    ]
};
