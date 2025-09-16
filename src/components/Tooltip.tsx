const Tooltip = ({ text }: { text: string }) => {
    return (
        <div className="relative group inline-block">

            <div className="absolute bottom-full left-1/2 -translate-x-10 translate-y-15 mb-2
                      hidden group-hover:block
                      bg-gray-800 text-white text-xs rounded py-1 px-2 z-10 whitespace-nowrap">
                {text}
            </div>
        </div>
    );
};

export default Tooltip

