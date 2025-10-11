import { GrammarQuestion } from '../../types';

const shuffleArray = <T,>(array: T[]): T[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

const baiTap1: GrammarQuestion[] = [
    {
        id: 'inversion-bt1-1',
        questionText: '------- you require technical assistance with the new software, please refer to the troubleshooting section of the manual.',
        options: { A: 'Must', B: 'Should', C: 'If only', D: 'Had' },
        correctAnswer: 'B',
        explanation: "Đây là dạng đảo ngữ của câu điều kiện loại 1, dùng 'Should' thay cho 'If' để thể hiện sự trang trọng. Cấu trúc: Should + S + V(nguyên mẫu), S + will/can/may + V. (Should you require... = If you require...)"
    },
    {
        id: 'inversion-bt1-2',
        questionText: 'The contract will be terminated immediately ------- either party violate the terms outlined in the agreement.',
        options: { A: 'unless', B: 'while', C: 'should', D: 'whereas' },
        correctAnswer: 'C',
        explanation: "Đây là dạng đảo ngữ của câu điều kiện loại 1 trong một mệnh đề phụ. 'should' được dùng với nghĩa 'if' trong các ngữ cảnh trang trọng, theo sau là chủ ngữ và động từ nguyên mẫu không 'to'. Cấu trúc: S + will + V + should + S + V(nguyên mẫu)."
    },
    {
        id: 'inversion-bt1-3',
        questionText: 'The manufacturing plant may increase production next quarter ------- demand from overseas markets stabilize.',
        options: { A: 'in case', B: 'provided that', C: 'should', D: 'as long as' },
        correctAnswer: 'B',
        explanation: "'provided that' (miễn là) là một liên từ điều kiện, tương tự như 'if'. Nó giới thiệu một điều kiện phải được đáp ứng để mệnh đề chính xảy ra."
    },
    {
        id: 'inversion-bt1-4',
        questionText: '------- the weather be unsuitable for the outdoor ceremony, we will move the event to the Grand Ballroom.',
        options: { A: 'Unless', B: 'Would', C: 'If', D: 'Should' },
        correctAnswer: 'D',
        explanation: "Đây là đảo ngữ câu điều kiện loại 1, dùng 'Should' thay cho 'If'. Cấu trúc: Should + S + V(nguyên mẫu)."
    },
    {
        id: 'inversion-bt1-5',
        questionText: '------- I a venture capitalist, I would certainly invest in your innovative start-up.',
        options: { A: 'Had', B: 'Were', C: 'If', D: 'Should' },
        correctAnswer: 'B',
        explanation: "Đây là đảo ngữ câu điều kiện loại 2. 'Were' được đảo lên đầu câu, thay thế cho 'If I were'. Cấu trúc: Were + S + (to V)..."
    },
    {
        id: 'inversion-bt1-6',
        questionText: 'He would accept the promotion to Regional Manager ------- the salary offer more competitive.',
        options: { A: 'to be', B: 'were', C: 'has been', D: 'is' },
        correctAnswer: 'B',
        explanation: "Đây là đảo ngữ của câu điều kiện loại 2, mệnh đề 'if' bị lược bỏ và 'were' được đảo lên đầu. Câu đầy đủ là '...if the salary offer were more competitive'."
    },
    {
        id: 'inversion-bt1-7',
        questionText: '------- we to miss the early morning flight, we would have to reschedule all our appointments in Paris.',
        options: { A: 'Unless', B: 'If only', C: 'Were', D: 'Had' },
        correctAnswer: 'C',
        explanation: "Đây là đảo ngữ câu điều kiện loại 2 với cấu trúc 'Were + S + to V'. Nó dùng để giả định một tình huống ít có khả năng xảy ra trong tương lai."
    },
    {
        id: 'inversion-bt1-8',
        questionText: 'If the current CEO ------- to step down suddenly, the Board of Directors would appoint an interim leader.',
        options: { A: 'had', B: 'should', C: 'were', D: 'has' },
        correctAnswer: 'C',
        explanation: "Đây là câu điều kiện loại 2, sử dụng cấu trúc 'If + S + were to V' để diễn tả một giả định ít có khả năng xảy ra ở hiện tại hoặc tương lai."
    },
    {
        id: 'inversion-bt1-9',
        questionText: '------- the laboratory secured the proper funding, the medical breakthrough would have been announced last month.',
        options: { A: 'If only', B: 'Had', C: 'Were', D: 'Should' },
        correctAnswer: 'B',
        explanation: "Đây là đảo ngữ câu điều kiện loại 3. 'Had' được đảo lên đầu câu, thay thế cho 'If the laboratory had secured...'. Cấu trúc: Had + S + V3/ed."
    },
    {
        id: 'inversion-bt1-10',
        questionText: 'The merger between the two firms ------- through smoothly if both sides had been more transparent during negotiations.',
        options: { A: 'went', B: 'would go', C: 'would have gone', D: 'had gone' },
        correctAnswer: 'C',
        explanation: "Đây là câu điều kiện loại 3 (Mệnh đề if: Quá khứ hoàn thành), diễn tả một giả định trái với quá khứ. Mệnh đề chính có cấu trúc: S + would have + V3/ed."
    },
    {
        id: 'inversion-bt1-11',
        questionText: '------- it not been for the comprehensive insurance plan, the company would have suffered a huge financial loss.',
        options: { A: 'If', B: 'Was', C: 'Should', D: 'Had' },
        correctAnswer: 'D',
        explanation: "Đây là đảo ngữ câu điều kiện loại 3 với cấu trúc 'Had it not been for...', có nghĩa là 'Nếu không có...'. Câu diễn tả một giả định trái ngược với quá khứ."
    },
    {
        id: 'inversion-bt1-12',
        questionText: 'The auditors would have found the discrepancy earlier ------- they reviewed all the financial statements more thoroughly.',
        options: { A: 'had', B: 'did', C: 'if', D: 'were' },
        correctAnswer: 'A',
        explanation: "Đây là đảo ngữ câu điều kiện loại 3, 'had' được đảo lên trước chủ ngữ 'they', thay cho 'if they had reviewed...'. Mệnh đề chính đã cho là 'would have found'."
    },
    {
        id: 'inversion-bt1-13',
        questionText: 'If you ------- the warranty when you purchased the appliance, the repair would have been free of charge.',
        options: { A: 'registered', B: 'have registered', C: 'had registered', D: 'register' },
        correctAnswer: 'C',
        explanation: "Đây là câu điều kiện loại 3, diễn tả một giả định trái với quá khứ. Mệnh đề 'if' sử dụng thì quá khứ hoàn thành (had + V3/ed)."
    },
    {
        id: 'inversion-bt1-14',
        questionText: 'If the CEO ------- to approve the budget, the project will begin immediately.',
        options: { A: 'does', B: 'did', C: 'is', D: 'will' },
        correctAnswer: 'A',
        explanation: "Đây là câu điều kiện loại 1, diễn tả một hành động có thể xảy ra trong tương lai. Mệnh đề 'if' sử dụng thì hiện tại đơn. Với chủ ngữ 'the CEO' (ngôi thứ ba số ít), động từ 'do' phải chia là 'does'."
    },
    {
        id: 'inversion-bt1-15',
        questionText: 'The project deadline ------- delayed if there are any further unforeseen issues with the supply chain.',
        options: { A: 'has been', B: 'will be', C: 'is', D: 'would have been' },
        correctAnswer: 'B',
        explanation: "Đây là câu điều kiện loại 1. Mệnh đề 'if' ở thì hiện tại đơn ('are'), nên mệnh đề chính sẽ ở thì tương lai đơn ('will be')."
    },
    {
        id: 'inversion-bt1-16',
        questionText: 'We would have won the contract, provided that we ------- a better presentation of our proposal.',
        options: { A: 'made', B: 'had made', C: 'would make', D: 'make' },
        correctAnswer: 'B',
        explanation: "'provided that' có chức năng tương tự 'if'. Mệnh đề chính 'We would have won...' là của câu điều kiện loại 3, vì vậy mệnh đề điều kiện phải ở thì quá khứ hoàn thành ('had made')."
    },
    {
        id: 'inversion-bt1-17',
        questionText: 'If the factory produces 500 units a day, its output ------- the monthly quota.',
        options: { A: 'reaches', B: 'would reach', C: 'will reach', D: 'had reached' },
        correctAnswer: 'C',
        explanation: "Đây là câu điều kiện loại 1, diễn tả một sự thật hoặc một hành động có khả năng xảy ra. Mệnh đề 'if' ở thì hiện tại đơn ('produces'), nên mệnh đề chính dùng thì tương lai đơn ('will reach')."
    },
    {
        id: 'inversion-bt1-18',
        questionText: 'He could have finished the report on time ------- he not been assigned so many last-minute tasks.',
        options: { A: 'unless', B: 'if', C: 'had', D: 'were' },
        correctAnswer: 'C',
        explanation: "Đây là đảo ngữ câu điều kiện loại 3 dạng phủ định. 'had' được đảo lên trước chủ ngữ 'he', thay cho 'if he had not been assigned...'."
    },
    {
        id: 'inversion-bt1-19',
        questionText: 'Ms. Petrova will receive a significant bonus ------- she exceeds her sales targets for the third consecutive quarter.',
        options: { A: 'while', B: 'if', C: 'as if', D: 'unless' },
        correctAnswer: 'B',
        explanation: "Đây là câu điều kiện loại 1. 'if' (nếu) là liên từ phù hợp nhất để diễn tả điều kiện để cô Petrova nhận được tiền thưởng. (Note: Assuming 'if' was an intended option as others don't fit well)."
    },
    {
        id: 'inversion-bt1-20',
        questionText: 'I would not have agreed to the partnership ------- I known about their prior legal troubles.',
        options: { A: 'if', B: 'had', C: 'did', D: 'were' },
        correctAnswer: 'B',
        explanation: "Đây là đảo ngữ câu điều kiện loại 3. 'Had' được đảo lên đầu câu, thay thế cho 'if I had known...'. Cấu trúc: Had + S + V3/ed."
    }
];

const baiTap2: GrammarQuestion[] = [
    {
        id: 'inversion-bt2-1',
        questionText: 'If the company ------- their social media strategy, they will see an increase in online engagement.',
        options: { A: 'had revised', B: 'would revise', C: 'revises', D: 'revised' },
        correctAnswer: 'C',
        explanation: "Đây là câu điều kiện loại 1, diễn tả một hành động có thể xảy ra. Mệnh đề 'if' dùng thì hiện tại đơn. Với chủ ngữ 'the company' (số ít), động từ 'revise' phải được chia là 'revises'."
    },
    {
        id: 'inversion-bt2-2',
        questionText: 'Had we checked the inventory log earlier, we ------- the shortage of components before the assembly line started.',
        options: { A: 'would detect', B: 'would have detected', C: 'will detect', D: 'had detected' },
        correctAnswer: 'B',
        explanation: "Đây là đảo ngữ câu điều kiện loại 3 ('Had we checked...' = 'If we had checked...'). Mệnh đề chính phải có cấu trúc 'would have + V3/ed'."
    },
    {
        id: 'inversion-bt2-3',
        questionText: 'The construction supervisor would sign off on the final payment ------- the subcontractor completes the remaining punch list items.',
        options: { A: 'should', B: 'if only', C: 'provided that', D: 'whether' },
        correctAnswer: 'C',
        explanation: "'provided that' (miễn là) là một liên từ điều kiện, tương tự 'if', dùng để giới thiệu điều kiện cần thiết để mệnh đề chính xảy ra."
    },
    {
        id: 'inversion-bt2-4',
        questionText: '------- a staff member be unable to attend the mandatory training session, they must inform their department head immediately.',
        options: { A: 'Did', B: 'Were', C: 'Had', D: 'Should' },
        correctAnswer: 'D',
        explanation: "Đây là đảo ngữ của câu điều kiện loại 1, dùng 'Should' thay cho 'If' trong ngữ cảnh trang trọng. Cấu trúc: Should + S + V(nguyên mẫu)."
    },
    {
        id: 'inversion-bt2-5',
        questionText: 'If I ------- the opportunity to lead the overseas division, I would definitely take it.',
        options: { A: 'have', B: 'had', C: 'had had', D: 'would have' },
        correctAnswer: 'B',
        explanation: "Đây là câu điều kiện loại 2, diễn tả một giả định không có thật ở hiện tại. Mệnh đề 'if' sử dụng thì quá khứ đơn ('had')."
    },
    {
        id: 'inversion-bt2-6',
        questionText: 'The museum director might approve the purchase of the artifact ------- the funding committee agrees to sponsor the cost.',
        options: { A: 'if', B: 'unless', C: 'while', D: 'during' },
        correctAnswer: 'A',
        explanation: "'if' (nếu) là liên từ điều kiện phổ biến nhất, giới thiệu điều kiện để hành động trong mệnh đề chính có thể xảy ra. (Note: Assuming 'if' was an intended option as others don't fit)."
    },
    {
        id: 'inversion-bt2-7',
        questionText: 'The presentation would have been more successful ------- the technical equipment not malfunctioned halfway through.',
        options: { A: 'if', B: 'had', C: 'were', D: 'provided' },
        correctAnswer: 'B',
        explanation: "Đây là đảo ngữ câu điều kiện loại 3 dạng phủ định. 'had' được đảo lên trước chủ ngữ 'the technical equipment', thay cho 'if the technical equipment had not malfunctioned...'."
    },
    {
        id: 'inversion-bt2-8',
        questionText: '------- the CEO to resign suddenly, the board would need to appoint an interim replacement within 48 hours.',
        options: { A: 'Had', B: 'Should', C: 'If', D: 'Were' },
        correctAnswer: 'D',
        explanation: "Đây là đảo ngữ câu điều kiện loại 2, sử dụng cấu trúc 'Were + S + to V...' để diễn tả một giả định ít có khả năng xảy ra."
    },
    {
        id: 'inversion-bt2-9',
        questionText: 'If the auditor finds any irregularities, he ------- the final report to the executive committee.',
        options: { A: 'submits', B: 'would have submitted', C: 'will submit', D: 'submitted' },
        correctAnswer: 'C',
        explanation: "Đây là câu điều kiện loại 1. Mệnh đề 'if' ở thì hiện tại đơn ('finds'), nên mệnh đề chính sẽ ở thì tương lai đơn ('will submit')."
    },
    {
        id: 'inversion-bt2-10',
        questionText: 'He would have accepted the job offer, ------- the starting salary been slightly higher.',
        options: { A: 'if', B: 'had', C: 'were', D: 'should' },
        correctAnswer: 'B',
        explanation: "Đây là đảo ngữ câu điều kiện loại 3. 'had' được đảo lên trước chủ ngữ 'the starting salary', thay cho 'if the starting salary had been...'."
    },
    {
        id: 'inversion-bt2-11',
        questionText: 'We can ship your order today ------- you finalize the payment before 2:00 P.M.',
        options: { A: 'unless', B: 'only if', C: 'in case', D: 'as long as' },
        correctAnswer: 'B',
        explanation: "'only if' (chỉ khi) nhấn mạnh rằng điều kiện (hoàn tất thanh toán) là bắt buộc để hành động (giao hàng) có thể xảy ra."
    },
    {
        id: 'inversion-bt2-12',
        questionText: '------- it not been for the storm, the ship would have arrived at the port this morning.',
        options: { A: 'Should', B: 'If', C: 'Were', D: 'Had' },
        correctAnswer: 'D',
        explanation: "Đây là đảo ngữ câu điều kiện loại 3 với cấu trúc 'Had it not been for...' có nghĩa là 'Nếu không có...'. Câu diễn tả một giả định trái ngược với quá khứ."
    },
    {
        id: 'inversion-bt2-13',
        questionText: 'The company’s stock value ------- significantly if the merger deal fails to go through.',
        options: { A: 'drops', B: 'would have dropped', C: 'will drop', D: 'had dropped' },
        correctAnswer: 'C',
        explanation: "Đây là câu điều kiện loại 1. Mệnh đề 'if' ở thì hiện tại đơn ('fails'), nên mệnh đề chính sẽ ở thì tương lai đơn ('will drop')."
    },
    {
        id: 'inversion-bt2-14',
        questionText: '------- the training manual were written in a simpler language, new employees would grasp the procedures faster.',
        options: { A: 'Should', B: 'If', C: 'Unless', D: 'Were' },
        correctAnswer: 'B',
        explanation: "Đây là câu điều kiện loại 2, 'If' là liên từ phù hợp nhất. Mệnh đề 'if' dùng quá khứ giả định ('were written')."
    },
    {
        id: 'inversion-bt2-15',
        questionText: 'If the quality control team ------- stricter standards, the defective product rate would drop to almost zero.',
        options: { A: 'enforced', B: 'had enforced', C: 'will enforce', D: 'would enforce' },
        correctAnswer: 'A',
        explanation: "Đây là câu điều kiện loại 2, diễn tả một giả định ở hiện tại. Mệnh đề 'if' sử dụng thì quá khứ đơn ('enforced')."
    },
    {
        id: 'inversion-bt2-16',
        questionText: 'Our profits might be higher next year, ------- the global economic forecast turns out to be accurate.',
        options: { A: 'during', B: 'in addition', C: 'provided that', D: 'except' },
        correctAnswer: 'C',
        explanation: "'provided that' (miễn là) là một liên từ điều kiện, tương tự 'if', được sử dụng để giới thiệu một điều kiện."
    },
    {
        id: 'inversion-bt2-17',
        questionText: 'I would not have bought the printer ------- I known it was not compatible with our network system.',
        options: { A: 'if', B: 'had', C: 'were', D: 'should' },
        correctAnswer: 'B',
        explanation: "Đây là đảo ngữ câu điều kiện loại 3. 'Had' được đảo lên đầu câu, thay thế cho 'if I had known...'."
    },
    {
        id: 'inversion-bt2-18',
        questionText: 'If the client ------- not reply to the email by the end of the day, we will proceed with the original design.',
        options: { A: 'had', B: 'did', C: 'does', D: 'would' },
        correctAnswer: 'C',
        explanation: "Đây là câu điều kiện loại 1. Mệnh đề 'if' ở thì hiện tại đơn. Ở dạng phủ định, với chủ ngữ số ít 'the client', ta dùng 'does not'."
    },
    {
        id: 'inversion-bt2-19',
        questionText: 'The renovation of the main lobby will begin next week, ------- we receive the necessary permits from the city council.',
        options: { A: 'unless', B: 'even though', C: 'as if', D: 'provided that' },
        correctAnswer: 'D',
        explanation: "'provided that' (miễn là) là một liên từ điều kiện, diễn tả rằng việc nhận được giấy phép là điều kiện cần thiết để việc cải tạo bắt đầu."
    },
    {
        id: 'inversion-bt2-20',
        questionText: '------- I a full-time programmer, I could assist the IT department with the software migration.',
        options: { A: 'Had', B: 'Should', C: 'Were', D: 'If only' },
        correctAnswer: 'C',
        explanation: "Đây là đảo ngữ câu điều kiện loại 2. 'Were' được đảo lên đầu câu, thay thế cho 'If I were'. Cấu trúc: Were + S + ..."
    }
];

const baiTap3: GrammarQuestion[] = [
    {
        id: 'inversion-bt3-1',
        questionText: '------- has the city council proposed such a drastic change to the zoning laws.',
        options: { A: 'Never before', B: 'In addition', C: 'Despite', D: 'Generally' },
        correctAnswer: 'A',
        explanation: "Khi một trạng từ phủ định như 'Never before' đứng đầu câu để nhấn mạnh, ta phải đảo ngữ bằng cách đưa trợ động từ ('has') lên trước chủ ngữ ('the city council')."
    },
    {
        id: 'inversion-bt3-2',
        questionText: 'On the desk in the corner of the office ------- the laptop containing all the financial data.',
        options: { A: 'are', B: 'is', C: 'sitting', D: 'stood' },
        correctAnswer: 'B',
        explanation: "Khi một cụm giới từ chỉ nơi chốn đứng đầu câu, động từ có thể được đảo lên trước chủ ngữ. Chủ ngữ ở đây là 'the laptop' (số ít), nên động từ phải là 'is'."
    },
    {
        id: 'inversion-bt3-3',
        questionText: 'The new software update is not only essential for security, but ------- does it improve overall system speed.',
        options: { A: 'also', B: 'neither', C: 'so', D: 'nor' },
        correctAnswer: 'A',
        explanation: "Cấu trúc đảo ngữ với 'Not only... but also...'. Khi 'Not only' đứng đầu mệnh đề, mệnh đề đó phải đảo ngữ. Mệnh đề thứ hai bắt đầu bằng 'but also', và nếu có đảo ngữ, nó cũng theo sau 'but also'."
    },
    {
        id: 'inversion-bt3-4',
        questionText: 'Not until all the supporting documents were reviewed _______ the committee approve the project funding.',
        options: { A: 'did', B: 'was', C: 'that', D: 'it' },
        correctAnswer: 'A',
        explanation: "Cấu trúc đảo ngữ 'Not until + [mệnh đề/cụm từ] + trợ động từ + S + V'. Sau mệnh đề 'Not until...', mệnh đề chính phải được đảo ngữ bằng cách đưa trợ động từ 'did' lên trước chủ ngữ."
    },
    {
        id: 'inversion-bt3-5',
        questionText: '------- have I seen such dedication to customer service from an entire support team.',
        options: { A: 'Rarely', B: 'Often', C: 'Much', D: 'Very' },
        correctAnswer: 'A',
        explanation: "Khi một trạng từ tần suất mang nghĩa phủ định hoặc hiếm khi xảy ra như 'Rarely' đứng đầu câu, ta phải đảo ngữ bằng cách đưa trợ động từ ('have') lên trước chủ ngữ ('I')."
    },
    {
        id: 'inversion-bt3-6',
        questionText: 'At the entrance to the main convention hall ------- a large banner welcoming the keynote speaker.',
        options: { A: 'hangs', B: 'hanging', C: 'hang', D: 'to hang' },
        correctAnswer: 'A',
        explanation: "Khi một cụm giới từ chỉ nơi chốn đứng đầu câu, động từ có thể được đảo lên trước chủ ngữ. Chủ ngữ là 'a large banner' (số ít), nên động từ phải là 'hangs'."
    },
    {
        id: 'inversion-bt3-7',
        questionText: 'The client did not agree with the terms of the contract, and ------- did the legal team.',
        options: { A: 'so', B: 'either', C: 'neither', D: 'also' },
        correctAnswer: 'C',
        explanation: "'neither' được sử dụng để thể hiện sự đồng tình với một câu phủ định. Cấu trúc: Neither + trợ động từ + S."
    },
    {
        id: 'inversion-bt3-8',
        questionText: '------- is the new product environmentally friendly, but it is also competitively priced.',
        options: { A: 'As well as', B: 'Not only', C: 'Instead of', D: 'Provided that' },
        correctAnswer: 'B',
        explanation: "Đây là cấu trúc đảo ngữ 'Not only... but also...'. Khi 'Not only' đứng đầu câu, mệnh đề đầu tiên phải được đảo ngữ: Not only + is + S..."
    },
    {
        id: 'inversion-bt3-9',
        questionText: '------- the presentation finished did the executives begin the Q&A session.',
        options: { A: 'Scarcely', B: 'Only after', C: 'Just as', D: 'Since' },
        correctAnswer: 'B',
        explanation: "Cấu trúc đảo ngữ 'Only after + [mệnh đề/cụm từ] + trợ động từ + S + V'. Sau mệnh đề 'Only after...', mệnh đề chính phải được đảo ngữ bằng cách đưa trợ động từ 'did' lên trước chủ ngữ."
    },
    {
        id: 'inversion-bt3-10',
        questionText: 'Inside the package ------- detailed instructions on how to assemble the bookshelves.',
        options: { A: 'is', B: 'are', C: 'has', D: 'contains' },
        correctAnswer: 'B',
        explanation: "Khi một cụm giới từ chỉ nơi chốn đứng đầu câu, động từ có thể được đảo lên trước chủ ngữ. Chủ ngữ ở đây là 'detailed instructions' (số nhiều), nên động từ phải là 'are'."
    },
    {
        id: 'inversion-bt3-11',
        questionText: "The CEO praised the marketing team's success, and ------- did the Vice President of Operations.",
        options: { A: 'too', B: 'so', C: 'also', D: 'even' },
        correctAnswer: 'B',
        explanation: "'so' được sử dụng để thể hiện sự đồng tình với một câu khẳng định. Cấu trúc: So + trợ động từ + S."
    },
    {
        id: 'inversion-bt3-12',
        questionText: '------- will the company allow employees to work remotely full-time.',
        options: { A: 'Seldom', B: 'Always', C: 'Sometimes', D: 'Ever' },
        correctAnswer: 'A',
        explanation: "Khi một trạng từ tần suất mang nghĩa phủ định hoặc hiếm khi như 'Seldom' đứng đầu câu để nhấn mạnh, ta phải đảo ngữ bằng cách đưa trợ động từ ('will') lên trước chủ ngữ."
    },
    {
        id: 'inversion-bt3-13',
        questionText: 'Around the perimeter of the construction site ------- tall, reinforced safety fences.',
        options: { A: 'stands', B: 'standing', C: 'stand', D: 'stood' },
        correctAnswer: 'C',
        explanation: "Khi một cụm giới từ chỉ nơi chốn đứng đầu câu, động từ có thể được đảo lên trước chủ ngữ. Chủ ngữ là 'tall, reinforced safety fences' (số nhiều), nên động từ phải là 'stand'."
    },
    {
        id: 'inversion-bt3-14',
        questionText: 'The budget constraints were severe, and ------- were the pressures from the shareholders.',
        options: { A: 'neither', B: 'so', C: 'hardly', D: 'just as' },
        correctAnswer: 'B',
        explanation: "'so' được sử dụng để thể hiện sự đồng tình với một câu khẳng định. Cấu trúc: So + trợ động từ + S. Ở đây, 'so were the pressures' có nghĩa là 'the pressures were also severe'."
    },
    {
        id: 'inversion-bt3-15',
        questionText: '------- before this year has the company expanded into three new markets simultaneously.',
        options: { A: 'Never', B: 'Only', C: 'Always', D: 'Ever' },
        correctAnswer: 'A',
        explanation: "Khi 'Never' đứng đầu câu để nhấn mạnh, ta phải đảo ngữ bằng cách đưa trợ động từ ('has') lên trước chủ ngữ ('the company')."
    },
    {
        id: 'inversion-bt3-16',
        questionText: '------- after midnight did the server migration finally complete without errors.',
        options: { A: 'No sooner', B: 'Hardly', C: 'Not till', D: 'Scarcely' },
        correctAnswer: 'C',
        explanation: "'Not till' (hoặc 'Not until') khi đứng đầu câu yêu cầu đảo ngữ ở mệnh đề chính. Cấu trúc: Not till/until + [thời gian] + trợ động từ + S + V."
    },
    {
        id: 'inversion-bt3-17',
        questionText: 'Under the contract’s appendix ------- all the required legal disclosures and liability waivers.',
        options: { A: 'is', B: 'appears', C: 'appearing', D: 'are' },
        correctAnswer: 'D',
        explanation: "Khi một cụm giới từ chỉ nơi chốn đứng đầu câu, động từ có thể được đảo lên trước chủ ngữ. Chủ ngữ là 'all the required legal disclosures and liability waivers' (số nhiều), nên động từ phải là 'are'."
    },
    {
        id: 'inversion-bt3-18',
        questionText: 'The security key can only be activated by a verified technician, and ------- can the master control panel.',
        options: { A: 'also', B: 'so', C: 'neither', D: 'nor' },
        correctAnswer: 'B',
        explanation: "'so' được sử dụng để thể hiện sự đồng tình, có nghĩa là 'cũng vậy'. Cấu trúc: and + so + trợ động từ + S."
    },
    {
        id: 'inversion-bt3-19',
        questionText: '------- is the new facility a state-of-the-art data center, it is also powered entirely by solar energy.',
        options: { A: 'While', B: 'Not only', C: 'Just as', D: 'Whereas' },
        correctAnswer: 'B',
        explanation: "Đây là cấu trúc đảo ngữ 'Not only... but also...'. Khi 'Not only' đứng đầu câu, mệnh đề đầu tiên phải được đảo ngữ: Not only + is + S..."
    },
    {
        id: 'inversion-bt3-20',
        questionText: 'Across the conference table from the lead negotiator ------- the entire opposition\'s legal team.',
        options: { A: 'sits', B: 'is sitting', C: 'sat', D: 'sitting' },
        correctAnswer: 'A',
        explanation: "Khi một cụm giới từ chỉ nơi chốn đứng đầu câu, động từ có thể được đảo lên trước chủ ngữ. Chủ ngữ là 'the entire opposition\'s legal team' (coi là một đơn vị số ít), nên động từ là 'sits'."
    }
];

export const inversionQuizzes: Record<string, GrammarQuestion[]> = {
    "Bài tập 1": shuffleArray(baiTap1),
    "Bài tập 2": shuffleArray(baiTap2),
    "Bài tập 3": shuffleArray(baiTap3)
};
