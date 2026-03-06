import { Form } from "react-router";

export function LogoutButton() {
  return (
    <Form method="post" action="/logout">
      <button 
        type="submit"
        className="w-full flex items-center gap-3 cursor-pointer px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors group"
      >
        <svg 
          width="16" 
          height="16" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className="group-hover:-translate-x-1 transition-transform"
        >
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
          <polyline points="16 17 21 12 16 7" />
          <line x1="21" y1="12" x2="9" y2="12" />
        </svg>
        <span>Logout</span>
      </button>
    </Form>
  );
}