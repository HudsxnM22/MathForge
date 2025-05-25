import React from "react"
import styles from "./Policies.module.css"

const Policies = () => {
    return (
        <div className={styles.policiesContainer}>
            <h1 className={styles.policiesTitle}>Policies</h1>
            <div className={styles.policiesContent}>
                <div>
                    <h2>Privacy Policy</h2>
                    <p>
                        Effective Date: 5/24/2025
                        MathForge values your privacy. This Privacy Policy explains what information we collect, how we use it, and your rights.
                        1. Information We Collect
                        We collect the following information when you use MathForge:
                        Email address: used to create and manage your account.


                        User-generated content: including math notebooks and problem sets you create within the platform.


                        All information is stored securely in our database (PostgreSQL).
                        2. How We Use Your Information
                        We use your information to:
                        Provide account access and maintain session authentication.


                        Store and display your math content.


                        Communicate important service-related information, if needed.


                        3. Cookies & Session Data
                        MathForge uses essential cookies only, specifically to manage login sessions using JWT (JSON Web Tokens). We do not use cookies for tracking or marketing purposes.
                        4. Third-Party Services
                        While we use APIs like OpenAI and Wolfram Alpha to generate math content, no personal data is shared with these services. All requests are made server-side and content is tied only to your MathForge account.
                        5. Children's Privacy
                        MathForge is not intended for children under the age of 13. We do not knowingly collect personal information from users under 13. If you are under 13, please do not create an account.
                        6. Data Security
                        We use reasonable safeguards to protect your information, including encrypted storage of passwords and secure server infrastructure.
                        7. Your Rights
                        You may contact us to:
                        Request deletion of your account and associated data


                        Ask questions about this policy


                        8. Changes to This Policy
                        We may update this Privacy Policy from time to time. If we do, we'll notify users through the app or via email.
                    </p>
                </div>
                <div>
                    <h2>Terms of Service</h2>
                    <p>Effective Date: 5/24/2025
                        By creating an account or using MathForge, you agree to the following Terms of Service. If you do not agree, please do not use the platform.

                        1. Use of the Service
                        MathForge is currently offered free of charge, but you must create an account to use its features.


                        We reserve the right to introduce paid features in the future if donations or resources allow for further development and commercialization.


                        2. User Eligibility
                        You must be 13 years or older to use MathForge.


                        By registering, you confirm that you meet this age requirement.


                        3. Ownership of Content
                        Any math problems, notebooks, or content generated on the platform are the property of MathForge.


                        We may use user-generated content for internal improvements, showcasing examples, or future platform features.


                        4. Prohibited Use
                        You agree not to:
                        Use the service for any unlawful or malicious purpose.


                        Attempt to hack, scrape, or overload the service.


                        Use the service in any commercial capacity without prior permission.


                        5. Availability
                        MathForge is provided “as is” with no guarantee of uptime, accuracy, or uninterrupted service.


                        We are not liable for any loss of data, service outages, or resulting damages.


                        6. Termination
                        We reserve the right to suspend or terminate your access at any time, for any reason, including misuse or violation of these terms.
                        7. Changes to Terms
                        We may update these Terms at any time. Continued use of the platform means you accept any changes.
                    </p>
                </div>
                <div>
                    <h2>Disclaimer</h2>
                    <p>MathForge provides limited access to AI-generated content through a token-based system. Each user receives up to 5 notebook creation tokens per month, based on the availability of shared community tokens.
                        These limitations exist because the underlying AI services (such as OpenAI and Wolfram Alpha) incur real costs that the MathForge team cannot fully cover. The platform is currently maintained without external funding.
                        Donations
                        Donations are welcomed and deeply appreciated, but do not grant additional tokens, features, or benefits. They simply help keep MathForge running and accessible for everyone.
                        By using MathForge, you understand and agree to these limitations and acknowledge that access to features may be constrained by available resources.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Policies