export default function Spinner() {
    return (
        <div className="flex items-center justify-center h-16 w-full bg-white">
            <div className="h-6 w-6 border-4 border-white border-t-transparent rounded-full animate-spin" />
        </div>
    );
}
