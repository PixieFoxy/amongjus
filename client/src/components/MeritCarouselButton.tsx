import React from 'react'

type Props = {
    direction: string
    onClick: () => void
}

const MeritCarouselButton = (props: Props) => {

    const arrow = props.direction === 'right' ? 
    'w-0 h-0 border-l-[32px] border-t-[16px] border-b-[16px] border-solid border-t-transparent border-b-transparent border-l-timberwolf/50 rounded-sm ml-2' :
    'w-0 h-0 border-r-[32px] border-t-[16px] border-b-[16px] border-solid border-t-transparent border-b-transparent border-r-timberwolf/50 rounded-sm mr-2'

    
  return (
    <button className='flex rounded-full w-16 h-16 bg-feldgrau/30 justify-around items-center hover:bg-feldgrau' onClick={props.onClick}>
        <div className={ arrow }>
        </div>
    </button>
  )
}

export default MeritCarouselButton