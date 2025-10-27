import React from 'react';
import { BookOpenIcon, MicrophoneIcon } from './icons';

interface PracticeHubProps {
  onNavigateToVocabulary: () => void;
  onNavigateToPronunciation: () => void;
}

const PracticeCard: React.FC<{title: string, description: string, onClick: () => void, icon: React.FC<any>}> = ({ title, description, onClick, icon: Icon }) => (
    <button 
        onClick={onClick}
        className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer border border-slate-200 dark:border-slate-700 text-left w-full h-full flex flex-col items-center text-center"
    >
        <Icon className="h-12 w-12 text-blue-600 mb-4" />
        <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">{title}</h3>
        <p className="text-slate-600 dark:text-slate-400 flex-grow">{description}</p>
    </button>
);


const PracticeHub: React.FC<PracticeHubProps> = ({ 
    onNavigateToVocabulary,
    onNavigateToPronunciation
}) => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white sm:text-5xl">TOEIC không khó, học CHẮC bao ĐẬU</h2>
        <p className="mt-4 text-lg text-red-600 font-bold">
          Vì đây là sản phẩm đang phát triển. Nếu có sai sót, xin vui lòng nhắn tin cho thầy Phát qua Facebook cá nhân ở cuối trang.
        </p>
      </div>
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <PracticeCard 
            title="Từ vựng"
            description="Review saved vocabulary using a spaced repetition system to build your word bank."
            onClick={onNavigateToVocabulary}
            icon={BookOpenIcon}
        />
         <PracticeCard 
            title="Phát âm"
            description="Practice your pronunciation with AI feedback on single words, sentences, and paragraphs."
            onClick={onNavigateToPronunciation}
            icon={MicrophoneIcon}
        />
      </div>

      <div className="mt-16 max-w-4xl mx-auto relative overflow-hidden p-8 rounded-2xl bg-gradient-to-br from-amber-400 via-yellow-400 to-amber-500 border-2 border-yellow-200/50 shadow-2xl shadow-yellow-500/20 shine">
        <div className="relative text-red-900 space-y-4 font-medium">
            <p>
                <strong>Lưu ý:</strong> Đây chỉ là bản giới thiệu rút gọn về nền tảng luyện thi TOEIC. Nếu bạn nghiêm túc và quyết tâm chinh phục mục tiêu TOEIC trong thời gian tới, hãy liên hệ ngay với Thầy qua Facebook (ở cuối trang) để nhận tài khoản <strong>MIỄN PHÍ</strong>. Điều kiện cực kỳ đơn giản: Hãy chia sẻ rõ ràng Kế hoạch chinh phục TOEIC của bạn (<em>Ví dụ: Thời gian luyện thi? Cường độ ôn luyện mỗi tuần? Ngày dự kiến đi thi?</em>).
            </p>
            <p>
                Thầy sẽ cấp cho bạn tài khoản truy cập vào trang web có thời hạn 6 tháng – một khoảng thời gian lý tưởng để bạn bứt phá. Sau 6 tháng, nếu bạn chưa hoàn thành kỳ thi, tài khoản sẽ được ưu tiên nhường lại cho những học viên mới, đảm bảo tài nguyên được sử dụng hiệu quả nhất!
            </p>
            <h3 className="text-2xl font-bold pt-4 text-red-900">💎 Tại sao trang web này là "Chìa khóa" giúp bạn đạt điểm cao?</h3>
            <ul className="space-y-3 list-none pl-2">
                <li>
                    <strong className="font-extrabold block">Giá trị Bứt Phá - Chi phí ZERO:</strong> Trang web của Thầy tích hợp tất cả các tính năng cao cấp của những trang luyện TOEIC trả phí, nhưng hoàn toàn <strong>MIỄN PHÍ</strong> cho bạn!
                </li>
                <li>
                    <strong className="font-extrabold block">Luyện Tập Đột Phá:</strong> Khám phá những tính năng độc đáo và mới lạ (Luyện dịch, Luyện phản xạ) giúp bạn xây dựng kỹ năng toàn diện. Đặc biệt, hệ thống sẽ tự động đánh giá chi tiết sau mỗi lượt luyện tập, giúp bạn luôn nắm rõ năng lực và tiến độ của bản thân.
                </li>
                <li>
                    <strong className="font-extrabold block">Trải Nghiệm Tối Ưu:</strong> Để đảm bảo tốc độ truy cập mượt mà và trải nghiệm học tập tuyệt vời nhất cho tất cả mọi người, Thầy đang giới hạn số lượng tài khoản trong giai đoạn phát triển này. Sự giới hạn này chính là cam kết về chất lượng mà Thầy dành cho bạn!
                </li>
            </ul>
            <p className="text-lg font-bold pt-4">
                👉 Đừng chần chừ! Hãy chứng minh quyết tâm của bạn và mở khóa ngay công cụ luyện thi TOEIC mạnh mẽ này!
            </p>
        </div>
      </div>

    </div>
  );
};

export default PracticeHub;