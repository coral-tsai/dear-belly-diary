'use client';

import { useState } from 'react';
import InfiniteGallery from '@/components/InfiniteGallery';
import RestaurantModal, { type RestaurantInfo } from '@/components/RestaurantModal';
import CalendarView from '@/components/CalendarView';
import { LayoutGrid, Calendar } from 'lucide-react';


const restaurants: RestaurantInfo[] = [
	{
		name: 'The Garden Table',
		image: '/1.webp',
		type: '農場直送',
		address: '台北市大安區綠谷路123號',
		description: '每日嚴選當季食材，呈現最純粹的料理藝術。',
		coralReview: '食材新鮮度滿分，沙拉超級好吃！環境很舒適。',
		gabiReview: '很適合約會的地方，推薦他們的燉飯！',
		date: '2024-12-15',
	},
	{
		name: 'Ocean Breeze',
		image: '/2.webp',
		type: '海鮮料理',
		address: '高雄市鼓山區港景街45號',
		description: '港邊高級海鮮餐廳，現撈海產新鮮直送。',
		coralReview: '龍蝦超新鮮！價格偏高但值得，海景很美。',
		gabiReview: '生魚片入口即化，服務態度很好！',
		date: '2025-01-02',
	},
	{
		name: 'Sakura House',
		image: '/3.webp',
		type: '日式料理',
		address: '台中市西區櫻花巷78號',
		description: '正宗日式料理，展現職人精神與精緻美學。',
		coralReview: '壽司師傅手藝一流，必點鮭魚腹！',
		gabiReview: '抹茶甜點超讚，環境很有日本氛圍。',
		date: '2025-01-10',
	},
	{
		name: 'La Maison',
		image: '/4.webp',
		type: '法式料理',
		address: '台北市信義區優雅大道12號',
		description: '典雅法式餐廳，適合浪漫約會或商務宴請。',
		coralReview: '法式鵝肝超級嫩，紅酒選擇很多。',
		gabiReview: '燈光氣氛超棒，甜點車是亮點！',
		date: '2025-01-20',
	},
	{
		name: 'Spice Market',
		image: '/5.webp',
		type: '東南亞料理',
		address: '台南市中西區香料街56號',
		description: '融合泰越料理，香料完美配比的異國風情。',
		coralReview: '綠咖哩超道地！辣度可以客製化。',
		gabiReview: '河粉湯頭很清爽，份量超大！',
		date: '2025-01-25',
	},
	{
		name: 'Bella Italia',
		image: '/6.webp',
		type: '義式料理',
		address: '新竹市東區托斯卡尼路89號',
		description: '道地義大利風味，手工義大利麵與窯烤披薩。',
		coralReview: '披薩餅皮超酥脆，提拉米蘇必點！',
		gabiReview: '松露義大利麵香氣十足，很道地！',
		date: '2025-02-01',
	},
	{
		name: 'The Smokehouse',
		image: '/7.webp',
		type: '美式燒烤',
		address: '桃園市中壢區火焰街34號',
		description: '低溫慢烤肉品搭配自製醬料，肉食者天堂。',
		coralReview: '牛胸肉超軟嫩！醬料很特別。',
		gabiReview: '份量超大，適合多人聚餐！',
		date: '2025-02-03',
	},
	{
		name: 'Zen Garden',
		image: '/8.webp',
		type: '蔬食料理',
		address: '台北市松山區和平巷67號',
		description: '禪意素食，中西融合的豐富蔬食風味。',
		coralReview: '沒想到素食可以這麼好吃！很清爽。',
		gabiReview: '創意料理很驚艷，環境很放鬆。',
		date: '2025-02-05',
	},
];

const sampleImages = restaurants.map((r, i) => ({
	src: r.image,
	alt: r.name,
	id: i,
}));

export default function Home() {
	const [selectedRestaurant, setSelectedRestaurant] = useState<RestaurantInfo | null>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [viewMode, setViewMode] = useState<'gallery' | 'calendar'>('gallery');

	const handleImageClick = (imageIndex: number) => {
		setSelectedRestaurant(restaurants[imageIndex]);
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
		setSelectedRestaurant(null);
	};

	return (
		<main className="min-h-screen relative bg-white dark:bg-black transition-colors duration-500">
			{/* Content Toggle */}
			{viewMode === 'gallery' ? (
				<InfiniteGallery
					images={sampleImages}
					speed={1.2}
					zSpacing={3}
					visibleCount={12}
					falloff={{ near: 0.8, far: 14 }}
					className="h-screen w-full rounded-lg overflow-hidden"
					onImageClick={handleImageClick}
				/>
			) : (
				<CalendarView
					restaurants={restaurants}
					onRestaurantClick={(r) => {
						setSelectedRestaurant(r);
						setIsModalOpen(true);
					}}
				/>
			)}
			<div className={`fixed inset-0 pointer-events-none flex transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)]
				${viewMode === 'calendar'
					? 'z-50 items-start justify-start p-6 text-black dark:text-white'
					: 'z-20 items-center justify-center h-screen px-3 mix-blend-exclusion text-white'
				}
			`}>
				{/* Nav Background */}
				<div className={`absolute top-0 left-0 w-full h-24 bg-[#cbc2c2]/10 dark:bg-[#262323]/10 backdrop-blur-md transition-opacity duration-700 -z-10 [mask-image:linear-gradient(to_bottom,black_40%,transparent)]
					${viewMode === 'calendar' ? 'opacity-100' : 'opacity-0'}
				`} />

				<h1 className={`font-serif tracking-tight text-balance transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] relative
					${viewMode === 'calendar'
						? 'text-2xl md:text-3xl translate-x-0 translate-y-0'
						: 'text-4xl md:text-7xl text-center'
					}
				`}>
					Dear <span className="italic bold"> Belly </span> Diary,
				</h1>
			</div>

			{/* View Toggle Button */}
			<div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40">
				<div className="bg-white/10 backdrop-blur-md border border-white/20 p-1 rounded-full flex gap-1">
					<button
						onClick={() => setViewMode('gallery')}
						className={`p-2 rounded-full transition-all duration-300 ${viewMode === 'gallery'
							? 'bg-white text-black shadow-sm'
							: 'text-white hover:bg-white/10'
							}`}
						aria-label="Gallery View"
					>
						<LayoutGrid className="w-5 h-5" />
					</button>
					<button
						onClick={() => setViewMode('calendar')}
						className={`p-2 rounded-full transition-all duration-300 ${viewMode === 'calendar'
							? 'bg-white text-black shadow-sm'
							: 'text-white hover:bg-white/10'
							}`}
						aria-label="Calendar View"
					>
						<Calendar className="w-5 h-5" />
					</button>
				</div>
			</div>

			<RestaurantModal
				restaurant={selectedRestaurant}
				isOpen={isModalOpen}
				onClose={handleCloseModal}
			/>
		</main>
	);
}
