import QRCode from 'react-qr-code';
import React from 'react';

const Tag = ({ fabric, labelType }) => {
	return (
		<div className='w-[15.5cm] h-[8.5cm] border border-gray-300 font-sans flex m-auto text-gray-900'>
			{/* Vertical Fabric Type label */}
			<div className='bg-zinc-300 p-4 text-zinc-400 flex items-center justify-center w-[1.4cm]'>
				<h2 className='uppercase tracking-wider text-[16.3pt] whitespace-nowrap transform -rotate-90 origin-center'>{labelType}</h2>
			</div>

			{/* Main content */}
			<div className=' pl-[0.5cm] w-[9cm] flex flex-col justify-between tracking-wide'>
				<div>
					{/* Name and Color */}
					<div className='text-[12.75pt] my-5 tracking-wider'>
						<h1 className='font-medium uppercase'>
							{fabric.fabric},<span className='font-light capitalize'> {fabric.color}</span>
						</h1>
					</div>

					{/* Content rows with right-aligned labels */}
					<div className='flex text-[7.5pt] my-[0.1cm]'>
						<span className='w-22 text-right font-light mr-2'>CONTENT</span>
						<span className='font-normal'>{fabric.content}</span>
					</div>
					<div className='flex text-[7.5pt] my-[0.1cm]'>
						<span className='w-22 text-right mr-2 font-light'>DOUBLE RUBS</span>
						<span className='font-normal'>{fabric.rubs}</span>
					</div>
					<div className='flex text-[7.5pt] my-[0.1cm]'>
						<span className='w-22 text-right mr-2 font-light'>WIDTH</span>
						<span className='font-normal'>{fabric.width}</span>
					</div>

					{/* Usage */}
					<div className='flex text-[7.5pt] mt-3'>
						<div className='flex flex-col items-end mr-2'>
							<span className='w-22 text-right font-light'>USAGE</span>
							<div className='h-[2cm] w-[2cm]  mt-1'>
								<QRCode fgColor='#000000' value={'https://www.tonicliving.ca/'} size={75} />
							</div>
						</div>
						<div className=' font-medium flex flex-wrap flex-col text-[7.5pt] font-normal gap-1 mb-[0.3cm]'>
							{['Drapery', 'Upholstery', 'Romans', 'High-Performance', 'Pillows'].map((item) => (
								<div key={item} className='flex flex-row items-center '>
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
			<div className=' py-[1cm] px-[.2cm]  w-[5cm] flex flex-col justify-between'></div>
		</div>
	);
};

export default Tag;
