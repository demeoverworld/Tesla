import React from 'react'
import { useTranslations } from "next-intl";

function InstallNavigation() {
	const tInstallNavigation = useTranslations("InstallNavigation");

  return (
	<section className='mb-16 sm:mb-20 lg:mb-24'>
		<div className='mt-35'>
			<div className='flex w-full items-center'>
				<div className='text-center flex-col w-[56%] '>
                <h2 className='text-[40px] mb-4 font-bold'>{tInstallNavigation("title")}</h2>
				<p className='mb-4 text-gray-500'>{tInstallNavigation("description")}</p>
				<button className='w-37.5 rounded-[12px] border border-red-600 bg-red-600 h-8.75 text-white transition-all duration-300 hover:bg-white hover:border-red-600 hover:text-red-600'>{tInstallNavigation("reserve")}</button>
				</div>
				<div className='w-[44%] flex justify-start'>
				 <video className='w-[90%]' src="/videos/keyinstallation.mp4" autoPlay loop muted playsInline></video>
				</div>
			</div>
		</div>
	</section>
  )
}

export default InstallNavigation