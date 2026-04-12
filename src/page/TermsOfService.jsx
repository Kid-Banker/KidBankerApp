import Footer from "../components/Footer";

function TermsOfService() {
  return (
    <>
      <section className="min-h-screen flex flex-col items-center bg-gray-100 px-4 py-25">
        {/* Title */}
        <h1 className="text-xl font-semibold text-gray-800 mb-2 text-center">
          Terms Of Service
        </h1>
        <div className="w-10 h-0.5 text-gray-300 mb-8">----</div>

        {/* Content */}
        <div className="max-w-2xl text-sm text-[#979797] space-y-6 leading-relaxed text-left">
          {/* Introduction */}
          <div>
            <h2 className="font-semibold text-gray-700 mb-2">
              • <span className="mx-2">Acceptance of Terms</span>
            </h2>
            <p className="mx-5">
              By accessing or using the Kid Banker web application ("the
              Service"), you agree to be bound by these Terms of Service. If you
              do not agree to these terms, please do not use the Service. Since
              KidBanker is designed for the younger generation, users under the
              age of 18 must have the permission and supervision of a parent or
              legal guardian.
            </p>
          </div>

          {/* Information */}
          <div>
            <h2 className="font-semibold text-gray-700 mb-2">
              • <span className="mx-2">Description of Service</span>
            </h2>
            <p className="mx-5 mb-2">
              KidBanker is an educational financial management platform (Project
              CC26-PS007) that provides:
            </p>
            <ul className="list-disc ml-15 mb-5 space-y-1">
              <li>Income and expense tracking tools.</li>
              <li>Financial activity monitoring for parents.</li>
              <li>Paylater debt management and tracking.</li>
              <li>Integration with Google Calendar for payment reminders.</li>
            </ul>
            <p className="mx-5 mb-2">
              <b>IMPORTANT DISCLAIMER:</b> Kid Banker is NOT a financial
              institution, bank, or licensed money lender. We do not process
              real monetary transactions, facilitate loans, or integrate with
              actual bank accounts. The Service is strictly for{" "}
              <b>educational and manual tracking purposes.</b>
            </p>
          </div>

          {/* Usage - FIXED: removed <li> from inside <h2> */}
          <div>
            <h2 className="font-semibold text-gray-700 mb-2">
              • <span className="mx-2">Users Accounts & Security</span>
            </h2>

            <ul className="list-disc ml-9 space-y-1">
              <li>Users must authenticate using Google OAuth.</li>
              <li>
                You are responsible for maintaining the confidentiality of your
                account credentials.
              </li>
              <li>
                You agree to notify us immediately of any unauthorized use of
                your account.
              </li>
              <li>
                Kid Banker is not liable for any loss resulting from
                unauthorized access to your account.
              </li>
            </ul>
          </div>

          {/* Sharing */}
          <div>
            <h2 className="font-semibold text-gray-700 mb-2">
              • <span className="mx-2">Parental Consent & Monitoring</span>
            </h2>
            <ul className="list-disc ml-9 space-y-1">
              <li>The Service includes a "Parent-Child" linkage system.</li>
              <li>
                By linking accounts, the Parent account is granted permission to
                view all financial data and transaction history of the Child
                account.
              </li>
              <li>
                Approval System: Certain features, such as adding a "Paylater"
                entry, require the explicit approval of the linked Parent
                account.
              </li>
              <li>
                Parents or guardians are responsible for all approvals and
                financial guidance provided to the minor user through the
                platform.
              </li>
            </ul>
          </div>

          {/* Children */}
          <div>
            <h2 className="font-semibold text-gray-700 mb-2">
              • <span className="mx-2">Third-Party Integrations</span>
            </h2>
            <p className="mx-5 mb-2">
              Kid Banker is designed for the younger generation.
            </p>
            <ul className="list-disc ml-15 space-y-1">
              <li>
                Your use of these features is also subject to Google's Terms of
                Service and Privacy Policy.
              </li>
              <li>
                Kid Banker is not responsible for the availability, accuracy, or
                security of services provided by Google.
              </li>
            </ul>
          </div>

          {/* Security */}
          <div>
            <h2 className="font-semibold text-gray-700 mb-2">
              • <span className="mx-2">Prohibited Conduct</span>
            </h2>
            <p className="mx-5 mb-2">Users agree not to:</p>
            <ul className="list-disc ml-15 space-y-1">
              <li>Use the Service for any illegal activities.</li>
              <li>
                Attempt to gain unauthorized access to other users' financial
                data.
              </li>
              <li>
                Input false or misleading information that could disrupt the
                monitoring system.
              </li>
            </ul>
          </div>

          {/* Rights */}
          <div>
            <h2 className="font-semibold text-gray-700 mb-2">
              • <span className="mx-2">Limitation of Liability</span>
            </h2>
            <p className="mx-5 mb-2">
              To the maximum extent permitted by law, the KidBanker development
              team (CC26-PS007) shall not be liable for:
            </p>
            <ul className="list-disc ml-15 space-y-1">
              <li>
                Financial losses or debt issues arising from the use of the
                paylater tracking feature.
              </li>
              <li>
                Indirect, incidental, or consequential damages resulting from
                the use of the Service.
              </li>
              <li>Data loss due to technical failures or API disruptions.</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h2 className="font-semibold text-gray-700 mb-2">
              • <span className="mx-2">Disclaimer of Warranties</span>
            </h2>
            <p className="mx-5 mb-2">
              The Service is provided on an "AS IS" and "AS AVAILABLE" basis. We
              do not warrant that the Service will be uninterrupted, error-free,
              or that the financial calculations will always be 100% accurate if
              manual input errors occur.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-gray-700 mb-2">
              • <span className="mx-2">Account Termination</span>
            </h2>
            <p className="mx-5 mb-2">
              We reserve the right to suspend or terminate your access to
              KidBanker at our sole discretion, without notice, for conduct that
              we believe violates these Terms or is harmful to other users or
              the Service's integrity.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-gray-700 mb-2">
              • <span className="mx-2">Changes to Terms</span>
            </h2>
            <p className="mx-5 mb-2">
              We may update these Terms of Service from time to time. We will
              notify users of any significant changes by posting the new Terms
              on this page. Your continued use of the Service after changes are
              posted constitutes your acceptance of the new Terms.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-gray-700 mb-2">
              • <span className="mx-2">Contact Information</span>
            </h2>
            <p className="mx-5 mb-2">
              For any questions regarding these Terms, please contact the
              development team at: andikasatrionurcahyo@gmail.com
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default TermsOfService;
