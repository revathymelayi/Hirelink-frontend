import React from 'react'
import { useLocation } from 'react-router-dom';
import { PaperClipIcon } from '@heroicons/react/20/solid'
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { BASE_URL } from '../../../utils/urls';

function ViewCandidate() {
    const location = useLocation();
    const userDetails = location.state?.userDetails || null;
    const downloadResume = () => {
      // Construct the URL for the resume file using the file name
      if (userDetails && userDetails.userdetails && userDetails.userdetails.resume) {
        const resumeFileName = userDetails.userdetails.resume;
        const resumeURL = `${BASE_URL}/resumes/${resumeFileName}`;
  
        // Open the resume file in a new tab/window for download
        window.open(resumeURL, '_blank');
      }
    };
  
    if (!userDetails) {
      // If userDetails is null or not available, handle it here (e.g., show a loading message or redirect to an error page)
      return <div>Please download the file</div>;
    }

 
  console.log(userDetails)
  return (
    <div>
      <div className="px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-gray-900">Applicant Information</h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Personal details and application.</p>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Full name</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{userDetails.firstName} {userDetails.lastName} </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Top Skills</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{userDetails.userdetails.skills}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Qualification</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{userDetails.userdetails.qualification}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Salary expectation</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"> <CurrencyRupeeIcon
              style={{ fontSize: "small" }}
              className="mr-0.5   text-gray-600"
            />{userDetails.userdetails.salary}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">About</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
             {userDetails.userdetails.about}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Attachments</dt>
            <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <ul role="list" className="divide-y divide-gray-100 rounded-md border border-gray-200">
                <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                  <div className="flex w-0 flex-1 items-center">
                    <PaperClipIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                    <div className="ml-4 flex min-w-0 flex-1 gap-2">
                      <span className="truncate font-medium">{userDetails.userdetails.resume}</span>
                    
                    </div>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    <a href="#" onClick={downloadResume} className="font-medium text-indigo-600 hover:text-indigo-500">
                      Download
                    </a>
                  </div>
                </li>
               
              </ul>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  )

}

export default ViewCandidate
