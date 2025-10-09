"use client";

import { useState, useEffect } from "react";
import { useTracking, EVENTS } from "@/experiments/tracking";
import { getPostHog } from "@/lib/posthog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  XCircle,
  Activity,
  MousePointer,
  Eye,
} from "lucide-react";

export default function PostHogTestPage() {
  const { trackEvent, trackCTAClick, trackConversion } = useTracking();
  const [posthogStatus, setPosthogStatus] = useState<
    "checking" | "connected" | "error"
  >("checking");
  const [distinctId, setDistinctId] = useState<string>("");
  const [eventsSent, setEventsSent] = useState<string[]>([]);

  // Check PostHog connection
  useEffect(() => {
    const posthog = getPostHog();
    if (posthog && posthog.__loaded) {
      setPosthogStatus("connected");
      setDistinctId(posthog.get_distinct_id());
    } else {
      setPosthogStatus("error");
    }
  }, []);

  const handleTestEvent = (eventName: string) => {
    trackEvent(eventName, {
      test: true,
      timestamp: new Date().toISOString(),
    });
    setEventsSent((prev) => [...prev, `${eventName} (${new Date().toLocaleTimeString()})`]);
  };

  const handleTestCTA = () => {
    trackCTAClick("Test CTA Button", "posthog-test-page");
    setEventsSent((prev) => [
      ...prev,
      `cta_clicked (${new Date().toLocaleTimeString()})`,
    ]);
  };

  const handleTestConversion = () => {
    trackConversion(EVENTS.WAITLIST_JOINED, {
      test: true,
      source: "test-page",
    });
    setEventsSent((prev) => [
      ...prev,
      `${EVENTS.WAITLIST_JOINED} (${new Date().toLocaleTimeString()})`,
    ]);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">PostHog Integration Test</h1>
          <p className="text-gray-600">
            Test your PostHog tracking setup before running experiments
          </p>
        </div>

        {/* Status Card */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Connection Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-medium">PostHog Status:</span>
                {posthogStatus === "checking" && (
                  <Badge variant="secondary">Checking...</Badge>
                )}
                {posthogStatus === "connected" && (
                  <Badge className="bg-green-100 text-green-800">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Connected
                  </Badge>
                )}
                {posthogStatus === "error" && (
                  <Badge variant="destructive">
                    <XCircle className="w-4 h-4 mr-1" />
                    Not Connected
                  </Badge>
                )}
              </div>

              {posthogStatus === "connected" && (
                <>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Distinct ID:</span>
                    <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                      {distinctId}
                    </code>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-blue-800">
                      ✓ PostHog is loaded and tracking
                      <br />
                      ✓ Events will be sent to your PostHog project
                      <br />✓ Check PostHog Activity tab to see events in
                      real-time
                    </p>
                  </div>
                </>
              )}

              {posthogStatus === "error" && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-sm text-red-800 mb-2">
                    <strong>PostHog is not connected. Check:</strong>
                  </p>
                  <ul className="text-sm text-red-700 space-y-1 ml-4">
                    <li>
                      • NEXT_PUBLIC_POSTHOG_KEY is set in .env.local
                    </li>
                    <li>
                      • NEXT_PUBLIC_POSTHOG_HOST is set in .env.local
                    </li>
                    <li>• PostHogProvider wraps your app in layout.tsx</li>
                    <li>• Browser console for error messages</li>
                  </ul>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Test Events Card */}
        {posthogStatus === "connected" && (
          <>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MousePointer className="w-5 h-5" />
                  Test Event Tracking
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Click these buttons to send test events to PostHog. Check
                  your PostHog Activity tab to see them arrive in real-time.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button
                    onClick={() => handleTestEvent("test_event_basic")}
                    variant="outline"
                    className="w-full"
                  >
                    Send Basic Event
                  </Button>

                  <Button
                    onClick={handleTestCTA}
                    variant="outline"
                    className="w-full"
                  >
                    Send CTA Click Event
                  </Button>

                  <Button
                    onClick={() =>
                      handleTestEvent(EVENTS.FEATURE_EXPLORED)
                    }
                    variant="outline"
                    className="w-full"
                  >
                    Send Feature Interaction
                  </Button>

                  <Button
                    onClick={handleTestConversion}
                    variant="default"
                    className="w-full"
                  >
                    Send Conversion Event
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Events Sent Card */}
            {eventsSent.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="w-5 h-5" />
                    Events Sent ({eventsSent.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-50 rounded-lg p-4 max-h-64 overflow-y-auto">
                    <div className="space-y-2">
                      {eventsSent.map((event, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 text-sm"
                        >
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <code className="text-gray-700">{event}</code>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <p className="text-sm text-yellow-800">
                      <strong>Next step:</strong> Go to your PostHog dashboard
                      → Activity tab to see these events appear in real-time
                      (may take 5-10 seconds)
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </>
        )}

        {/* Instructions */}
        <Card className="mt-6 bg-gray-50">
          <CardHeader>
            <CardTitle>How to Verify in PostHog</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="space-y-3 text-sm">
              <li>
                <strong>1. Open PostHog Dashboard</strong>
                <br />
                <span className="text-gray-600">
                  Go to app.posthog.com (or your PostHog host)
                </span>
              </li>
              <li>
                <strong>2. Check Activity Tab</strong>
                <br />
                <span className="text-gray-600">
                  Click Activity in the sidebar → should see events appearing
                </span>
              </li>
              <li>
                <strong>3. Verify Event Properties</strong>
                <br />
                <span className="text-gray-600">
                  Click on an event to see properties: locale, test: true, etc.
                </span>
              </li>
              <li>
                <strong>4. Check Session Recording</strong>
                <br />
                <span className="text-gray-600">
                  Click Session Recordings → should see your session being
                  recorded
                </span>
              </li>
            </ol>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
