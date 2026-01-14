import React from "react";
import Link from "next/link";

export default function Privacy() {
  return (
    <div className="privacy-page">
      <div className="privacy-container">
        <Link href="/" className="back-link">
          ← Back to App
        </Link>

        <h1>Privacy Policy</h1>
        <p className="last-updated">Last updated: January 13, 2026</p>

        <section>
          <h2>Overview</h2>
          <p>
            Sobesednik (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your
            privacy. This Privacy Policy explains how we handle information when
            you use our application.
          </p>
        </section>

        <section>
          <h2>Data Collection and Storage</h2>
          <p>
            <strong>
              We do not store or retain any of your conversations.
            </strong>{" "}
            All interactions are processed in real-time and are not saved to any
            database or server.
          </p>
          <p>Key points:</p>
          <ul>
            <li>
              Your conversations are kept only in your device&apos;s memory during
              the session
            </li>
            <li>
              When you close the app or refresh the page, all conversation data
              is permanently deleted
            </li>
            <li>
              We do not collect, store, or have access to your personal
              information
            </li>
            <li>We do not use cookies or tracking technologies</li>
          </ul>
        </section>

        <section>
          <h2>Third-Party Services</h2>
          <p>
            Sobesednik uses OpenAI&apos;s API to generate conversational responses.
            When you interact with the app, your messages are sent to OpenAI&apos;s
            servers for processing.
          </p>
          <p>
            OpenAI&apos;s data usage policy: OpenAI may use API data for service
            improvement unless you opt out. For more information, please review{" "}
            <a
              href="https://openai.com/policies/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
            >
              OpenAI&apos;s Privacy Policy
            </a>
            .
          </p>
          <p>
            We have configured our implementation to minimize data retention,
            but we cannot control OpenAI&apos;s data handling practices.
          </p>
        </section>

        <section>
          <h2>Session Data</h2>
          <p>
            During your session, the following temporary data is maintained in
            your device&apos;s memory only:
          </p>
          <ul>
            <li>Your conversation history for the current session</li>
            <li>
              A temporary session ID (randomly generated, not linked to you)
            </li>
            <li>Your language preference (English or Russian)</li>
          </ul>
          <p>
            This data exists only while you&apos;re actively using the app and is
            automatically deleted when you close or refresh the application.
          </p>
        </section>

        <section>
          <h2>Export Feature</h2>
          <p>
            Our app includes an optional export feature that allows you to
            download or copy your conversation. This feature:
          </p>
          <ul>
            <li>
              Creates a local file on your device or copies text to your
              clipboard
            </li>
            <li>
              Is initiated only by your explicit action (clicking Copy or
              Download)
            </li>
            <li>Does not send data to our servers or any third party</li>
            <li>Gives you complete control over your conversation data</li>
          </ul>
        </section>

        <section>
          <h2>Children&apos;s Privacy</h2>
          <p>
            Sobesednik is not intended for use by children under the age of 13.
            We do not knowingly collect personal information from children under
            13.
          </p>
        </section>

        <section>
          <h2>Analytics and Tracking</h2>
          <p>
            We do not use analytics, tracking pixels, or any form of user
            tracking. We do not collect information about how you use the app,
            how often you use it, or any usage patterns.
          </p>
        </section>

        <section>
          <h2>Your Rights</h2>
          <p>
            Since we do not store any of your data, there is no data for you to
            request, modify, or delete. Your privacy is protected by design -
            nothing is kept.
          </p>
        </section>

        <section>
          <h2>Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify
            you of any changes by updating the &quot;Last updated&quot; date at the top of
            this policy.
          </p>
        </section>

        <section>
          <h2>Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact
            us at:{" "}
            <a href="mailto:privacy@sobesednik.app">privacy@sobesednik.app</a>
          </p>
        </section>

        <div className="privacy-footer">
          <Link href="/" className="back-link-bottom">
            ← Back to App
          </Link>
        </div>
      </div>
    </div>
  );
}
