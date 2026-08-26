const topic12_questions = [
  {
    question: "How does the AcademyEnrollmentOrchestrator capstone demonstrate all 5 SOLID principles working together?",
    shortAnswer: "1. SRP: Payment, notification, data, and orchestration are distinct classes. 2. OCP: New payment gateways and notification drivers can be added without modifying the orchestrator. 3. LSP: Any driver subtype can be substituted without crashes. 4. ISP: NotificationSender and PaymentGatewayDriver are segregated. 5. DIP: Orchestrator depends only on interfaces via constructor injection.",
    explanation: "This creates a production-grade enterprise design pattern.",
    hint: "Combines SRP, OCP, LSP, ISP, and DIP into a single clean architecture pipeline.",
    level: "Advanced",
    codeExample: "// Complete 5-principle pipeline in Topic 12"
  }
];

export default topic12_questions;