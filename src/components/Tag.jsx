import QRCode from 'react-qr-code';
import React from 'react';

const Tag = ({ fabric, labelType }) => {
	return (
		<div className='w-[15.5cm] font-[Browstd] h-[7.5cm] border border-gray-300 font-sans flex m-auto leading-[8pt] '>
			{/* Vertical Fabric Type label */}
			{/* Vertical Fabric Type label */}
<div className='bg-zinc-200 p-4 text-zinc-400/60 flex items-end justify-center w-[1.25cm] h-full relative'>
  <h2 
    className='uppercase text-[16.3pt] leading-[19pt] tracking-[0.125em] whitespace-nowrap absolute mb-[15px] bottom-0'
    style={{
      writingMode: 'vertical-rl',
      transform: 'rotate(180deg)',
      left: '50%',
      translate: '-50% 0'
    }}
  >
    {labelType}
  </h2>
</div>

			{/* Main content */}
			<div className=' pl-[0.5cm] w-[9.1cm] flex text-zinc-500 flex-col justify-between tracking-[0.05em] '>
				<div>
					{/* Name and Color */}
					<div className='text-[12.75pt] my-5'>
						<h1 className='font-medium uppercase text-zinc-700 tracking-[0.125em] leading-[19pt]'>
							{fabric.fabric},<span className='font-light text-zinc-600 capitalize'> {fabric.color}</span>
						</h1>
					</div>

					{/* Content rows with right-aligned labels */}
					<div className='flex text-[7.5pt] my-[0.25cm]'>
						<span className='w-22 text-right font-light  mr-2'>CONTENT</span>
						<span className='font-normal text-zinc-600 '>{fabric.content}</span>
					</div>
					<div className='flex text-[7.5pt] my-[0.25cm]'>
						<span className='w-22 text-right mr-2 font-light '>DOUBLE RUBS</span>
						<span className='font-normal text-zinc-600 '>{fabric.rubs}</span>
					</div>
					<div className='flex text-[7.5pt] my-[0.25cm]'>
						<span className='w-22 text-right mr-2 font-light'>WIDTH</span>
						<span className='font-normal text-zinc-600 '>{fabric.width}</span>
					</div>

					{/* Usage */}
					<div className='flex text-[7.5pt] mt-3'>
						<div className='flex flex-col items-end mr-2'>
							<span className='w-22 text-right font-light'>USAGE</span>
							<div className='h-[2cm] w-[2cm]  mt-1'>
								<QRCode fgColor='#000000' value={fabric.URL?fabric.URL:"https://www.tonicliving.com/"} size={75} />
							</div>
						</div>
						<div className=' font-normal text-zinc-600  flex flex-wrap flex-col text-[7.5pt] gap-[0.25cm] mb-[0.3cm]'>
							{fabric.usage
							  .split(',') // Split by comma
							  .map(item => item.trim()) // Trim whitespace
							  .filter(item => item) // Remove empty strings
							  .map((item) => (
							    <div key={item} className='flex flex-row items-center'>
							      <div className='w-2 h-2 mr-1'>
								      <img src='/Cross.svg' className='w-2 h-2 mr-1' alt='checkbox' />
							      </div>
							      {item}
							    </div>
							  ))}
						</div>
					</div>
				</div>
			</div>
			<div className=' py-[1cm] px-[.2cm]  w-[5cm] flex flex-col justify-between'>
			</div>
		</div>
	);
};

export default Tag;
