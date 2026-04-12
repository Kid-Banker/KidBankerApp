import Footer from "../components/Footer";

function PrivacyPolicy() {
  return (
    <>
      <section className="min-h-screen flex flex-col items-center bg-gray-100 px-4 py-25">
        {/* Title */}
        <h1 className="text-xl font-semibold text-gray-800 mb-2 text-center">
          Privacy & Policy
        </h1>
        <div className="w-10 h-[2px] text-gray-300 mb-8">----</div>

        {/* Content */}
        <div className="max-w-2xl text-sm text-[#979797] space-y-6 leading-relaxed text-left">
          {/* Introduction */}
          <div>
            <h2 className="font-semibold text-gray-700 mb-2">
              • <span className="mx-2">Introduction</span>
            </h2>
            <p className="mx-5">
              Welcome to Kid Banker. We are committed to protecting the privacy
              of our users, especially the younger generation, while providing a
              comprehensive financial tracking and education tool. This Privacy
              Policy explains how we collect, use, and safeguard information
              within our web application.
            </p>
          </div>

          {/* Information */}
          <div>
            <h2 className="font-semibold text-gray-700 mb-2">
              • <span className="mx-2">Information We Collect</span>
            </h2>
            <p className="mx-5 mb-2">
              To provide the features of Kid Banker, we collect the following
              types of information:
            </p>
            <ul className="list-disc ml-15 space-y-1">
              <li>
                Identity and Authentication Data: We use Google OAuth for secure
                login. When you sign in, we receive your name, email address,
                and profile picture from Google.
              </li>
              <li>
                Financial Transaction Data: We collect information you manually
                input, including income, expenses, savings totals, and
                transaction history.
              </li>
              <li>
                Paylater Management Data: We collect service names, bill
                amounts, and deadline dates for paylater tracking.
              </li>
              <li>
                Parent-Child Linkage: We store the association between a "Child"
                account and a "Parent" account to facilitate monitoring.
              </li>
              <li>
                Calendar Integration Data: To set reminders, we interact with
                your Google Calendar via API to create events for paylater
                deadlines.
              </li>
            </ul>
          </div>

          {/* Usage - FIXED: removed <li> from inside <h2> */}
          <div>
            <h2 className="font-semibold text-gray-700 mb-2">
              • <span className="mx-2">How We Use Your Information</span>
            </h2>
            <p className="mx-5 mb-2">
              Your data is used strictly for the following purposes:
            </p>
            <ul className="list-disc ml-15 space-y-1">
              <li>
                Financial Tracking: To calculate and display your financial
                health and history.
              </li>
              <li>
                Parental Monitoring: To allow authorized parent accounts to view
                transaction activities and approve/deny paylater requests.
              </li>
              <li>
                Notification Services: To automatically create reminders in your
                Google Calendar for payment deadlines.
              </li>
              <li>
                Service Improvement: To analyze usage patterns (anonymously) to
                improve the web app's functionality.
              </li>
            </ul>
          </div>

          {/* Sharing */}
          <div>
            <h2 className="font-semibold text-gray-700 mb-2">
              • <span className="mx-2">Data Sharing and Disclosure</span>
            </h2>
            <ul className="list-disc ml-12 space-y-1">
              <li>
                Parental Access: All financial data and paylater requests are
                shared with the linked Parent Account.
              </li>
              <li>
                Third-Party Services (Google): We share data with Google APIs
                solely to facilitate login (OAuth) and create calendar events.
                We do not sell your data to third-party advertisers.
              </li>
              <li>
                No Banking Integration: Kid Banker is a management tool only; we
                do not connect to your actual bank accounts or process direct
                payments.
              </li>
            </ul>
          </div>

          {/* Children */}
          <div>
            <h2 className="font-semibold text-gray-700 mb-2">
              •{" "}
              <span className="mx-2">Children’ Privacy (COPPA Compliance)</span>
            </h2>
            <p className="mx-5 mb-2">
              Kid Banker is designed for the younger generation.
            </p>
            <ul className="list-disc ml-15 space-y-1">
              <li>
                We require parental consent through the "Parent-Child Linkage"
                system.
              </li>
              <li>
                We do not collect more information than is necessary to
                participate in the financial tracking activities.
              </li>
              <li>
                Parents have the right to review and request the deletion of
                their child's data at any time.
              </li>
            </ul>
          </div>

          {/* Security */}
          <div>
            <h2 className="font-semibold text-gray-700 mb-2">
              • <span className="mx-2">Data Security</span>
            </h2>
            <p className="mx-5 mb-2">
              We implement industry-standard security measures to protect your
              information, including:
            </p>
            <ul className="list-disc ml-15 space-y-1">
              <li>Secure authentication through Google.</li>
              <li>Encryption of sensitive data in transit (HTTPS)..</li>
              <li>Restricted access to the database.</li>
            </ul>
          </div>

          {/* Rights */}
          <div>
            <h2 className="font-semibold text-gray-700 mb-2">
              • <span className="mx-2">Your Rights and Data Deletion</span>
            </h2>
            <p className="mx-5 mb-2">
              You have the right to access, update, or delete your information.
            </p>
            <ul className="list-disc ml-15 space-y-1">
              <li>
                Account Deletion: Users can request account deletion, which will
                remove all associated financial history and parent-child links
                from our active database.
              </li>
              <li>
                Revoking Google Access: You can revoke Kid Banker's access to
                your Google account at any time through your Google Security
                settings.
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h2 className="font-semibold text-gray-700 mb-2">
              • <span className="mx-2">Contact Us</span>
            </h2>
            <p className="mx-5 mb-2">
              If you have any questions about this Privacy Policy or our data
              practices, please contact our team <br />
              (CC26-PS007) at: andikasatrionurcahyo@gmail.com
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default PrivacyPolicy;
