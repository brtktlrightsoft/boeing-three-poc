
export default function HotspotMediaPopup({ mediaType, mediaUrl }: { mediaType: string, mediaUrl: string }) {
   
    return (
        <div onClick={() => { }} className="w-[55rem] aspect-[315/180]">
            {mediaType === 'image' ? (
                <img src={mediaUrl} alt="Hotspot Media" className="w-full h-full object-cover" />
            ) : (
                <video src={mediaUrl} autoPlay muted loop className="w-full h-full object-cover" />
            )}
        </div>
    );
}