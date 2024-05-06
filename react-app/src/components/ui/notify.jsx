import { toast } from 'react-hot-toast';

export const notify = (e) => {
    toast.custom((t) => (
        <div
          className={`${
            t.visible ? 'animate-enter' : 'animate-leave'
          } max-w-sm w-full bg-white shadow-lg shadow-slate-300 rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-10`}
        >
          <div className="flex-1 w-0 p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 pt-0.5">
                <img
                  className="h-10 w-10 rounded-full"
                  src={`http://127.0.0.1:8000/storage/Avatars/${e.employee.id}.jpg`}
                  alt=""
                />
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-900">
                  {e.employee.fname} {e.employee.lname}
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  {e.message}
                </p>
              </div>
            </div>
          </div>
          <div className="flex border-l border-gray-200">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-[#007cff] hover:text-[#085ec5] focus:outline-none focus:ring-2 focus:ring-[#007cff]"
            >
              Close
            </button>
          </div>
        </div>
      ),{
        duration: 2000
    });
    }