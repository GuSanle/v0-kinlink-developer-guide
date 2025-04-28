import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CodeBlock } from "@/components/code-block"

export default function DynamicSurveyPage() {
  return (
    <div className="container py-6 lg:py-10">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/examples">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">Dynamic Survey Builder</h1>
      </div>

      <div className="prose prose-blue dark:prose-invert max-w-none">
        <p className="lead">
          This example demonstrates how to create a dynamic survey that adapts to user responses with conditional
          questions, branching logic, and real-time validation.
        </p>

        <h2>Key Features</h2>
        <ul>
          <li>Conditional questions that appear based on previous answers</li>
          <li>Branching logic to create different paths through the survey</li>
          <li>Real-time validation of responses</li>
          <li>Dynamic question generation based on user data</li>
          <li>Progress tracking and navigation</li>
        </ul>

        <h2>Implementation</h2>
        <p>
          The dynamic survey is implemented using the Kinlink API to manage question visibility, validation, and
          branching logic. Here's the complete code:
        </p>

        <CodeBlock
          code={`(function() {
  // Survey configuration
  const SURVEY_CONFIG = {
    title: 'Customer Satisfaction Survey',
    description: 'Please help us improve our products and services by taking this short survey.',
    questions: [
      {
        id: 'customerType',
        text: 'What type of customer are you?',
        type: 'radio',
        options: ['New Customer', 'Returning Customer', 'Potential Customer'],
        required: true
      },
      {
        id: 'productUsage',
        text: 'Which of our products do you use?',
        type: 'checkbox',
        options: ['Product A', 'Product B', 'Product C', 'None'],
        showIf: (values) => values.customerType === 'Returning Customer',
        required: true
      },
      {
        id: 'productInterest',
        text: 'Which products are you interested in?',
        type: 'checkbox',
        options: ['Product A', 'Product B', 'Product C', 'Not sure yet'],
        showIf: (values) => values.customerType === 'Potential Customer',
        required: true
      },
      {
        id: 'productASatisfaction',
        text: 'How satisfied are you with Product A?',
        type: 'rating',
        options: ['1', '2', '3', '4', '5'],
        showIf: (values) => values.productUsage && values.productUsage.includes('Product A'),
        required: true
      },
      {
        id: 'productBSatisfaction',
        text: 'How satisfied are you with Product B?',
        type: 'rating',
        options: ['1', '2', '3', '4', '5'],
        showIf: (values) => values.productUsage && values.productUsage.includes('Product B'),
        required: true
      },
      {
        id: 'productCSatisfaction',
        text: 'How satisfied are you with Product C?',
        type: 'rating',
        options: ['1', '2', '3', '4', '5'],
        showIf: (values) => values.productUsage && values.productUsage.includes('Product C'),
        required: true
      },
      {
        id: 'improvementSuggestions',
        text: 'Do you have any suggestions for how we could improve our products?',
        type: 'textarea',
        showIf: (values) => values.customerType === 'Returning Customer',
        required: false
      },
      {
        id: 'contactReason',
        text: 'What prompted you to contact us today?',
        type: 'select',
        options: ['Saw an advertisement', 'Recommendation from friend', 'Online search', 'Other'],
        showIf: (values) => values.customerType === 'New Customer' || values.customerType === 'Potential Customer',
        required: true
      },
      {
        id: 'otherContactReason',
        text: 'Please specify the reason:',
        type: 'text',
        showIf: (values) => values.contactReason === 'Other',
        required: true
      },
      {
        id: 'futureContact',
        text: 'Would you like to be contacted about future products and promotions?',
        type: 'radio',
        options: ['Yes', 'No'],
        required: true
      },
      {
        id: 'contactMethod',
        text: 'How would you prefer to be contacted?',
        type: 'radio',
        options: ['Email', 'Phone', 'Mail'],
        showIf: (values) => values.futureContact === 'Yes',
        required: true
      },
      {
        id: 'contactEmail',
        text: 'Please provide your email address:',
        type: 'email',
        showIf: (values) => values.contactMethod === 'Email',
        required: true,
        validator: (value) => {
          if (!value) return 'Email is required';
          if (!/^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$/.test(value)) {
            return 'Please enter a valid email address';
          }
          return undefined;
        }
      },
      {
        id: 'contactPhone',
        text: 'Please provide your phone number:',
        type: 'tel',
        showIf: (values) => values.contactMethod === 'Phone',
        required: true,
        validator: (value) => {
          if (!value) return 'Phone number is required';
          if (!/^\\+?[\\d\\s()-]{10,20}$/.test(value)) {
            return 'Please enter a valid phone number';
          }
          return undefined;
        }
      },
      {
        id: 'contactAddress',
        text: 'Please provide your mailing address:',
        type: 'textarea',
        showIf: (values) => values.contactMethod === 'Mail',
        required: true
      },
      {
        id: 'additionalComments',
        text: 'Do you have any additional comments or feedback?',
        type: 'textarea',
        required: false
      }
    ]
  };
  
  // Initialize the form when it's loaded
  kinlink.events.on(kinlink.FormEvents.FORM_LOADED, () => {
    const form = kinlink.formApi;
    
    // Create survey title and description
    createSurveyHeader();
    
    // Create questions
    createQuestions();
    
    // Add validators
    addValidators();
    
    // Update question visibility based on initial values
    updateQuestionVisibility();
  });
  
  // Handle field changes
  kinlink.events.on(kinlink.FormEvents.FIELD_CHANGE, (data) => {
    // Update question visibility when any field changes
    updateQuestionVisibility();
  });
  
  // Function to create the survey header
  function createSurveyHeader() {
    const form = document.querySelector('form');
    
    const headerContainer = document.createElement('div');
    headerContainer.style.marginBottom = '2rem';
    
    const title = document.createElement('h2');
    title.textContent = SURVEY_CONFIG.title;
    title.style.fontSize = '1.5rem';
    title.style.fontWeight = 'bold';
    title.style.marginBottom = '0.5rem';
    
    const description = document.createElement('p');
    description.textContent = SURVEY_CONFIG.description;
    description.style.color = '#666';
    
    headerContainer.appendChild(title);
    headerContainer.appendChild(description);
    
    // Insert at the top of the form
    form.insertBefore(headerContainer, form.firstChild);
  }
  
  // Function to create questions
  function createQuestions() {
    // Questions are already defined in the Kinlink form
    // We just need to add custom styling and behavior
    
    SURVEY_CONFIG.questions.forEach(question => {
      const questionElement = document.querySelector(\`[data-field="\${question.id}"]\`);
      
      if (questionElement) {
        // Add question number and styling
        const labelElement = questionElement.querySelector('label');
        
        if (labelElement) {
          // Add required indicator
          if (question.required) {
            const requiredSpan = document.createElement('span');
            requiredSpan.textContent = ' *';
            requiredSpan.style.color = 'red';
            labelElement.appendChild(requiredSpan);
          }
        }
        
        // Add custom styling for rating questions
        if (question.type === 'rating') {
          const inputContainer = questionElement.querySelector('.input-container');
          
          if (inputContainer) {
            inputContainer.style.display = 'flex';
            inputContainer.style.gap = '0.5rem';
            
            const inputs = inputContainer.querySelectorAll('input[type="radio"]');
            const labels = inputContainer.querySelectorAll('label');
            
            inputs.forEach((input, index) => {
              const label = labels[index];
              
              if (label) {
                label.style.display = 'flex';
                label.style.flexDirection = 'column';
                label.style.alignItems = 'center';
                label.style.justifyContent = 'center';
                label.style.width = '40px';
                label.style.height = '40px';
                label.style.borderRadius = '50%';
                label.style.border = '1px solid #d9d9d9';
                label.style.cursor = 'pointer';
                
                input.addEventListener('change', () => {
                  // Reset all labels
                  labels.forEach(l => {
                    l.style.backgroundColor = '';
                    l.style.color = '';
                  });
                  
                  // Highlight selected label
                  if (input.checked) {
                    label.style.backgroundColor = '#1890ff';
                    label.style.color = 'white';
                  }
                });
              }
            });
          }
        }
      }
    });
  }
  
  // Function to add validators
  function addValidators() {
    const form = kinlink.formApi;
    
    SURVEY_CONFIG.questions.forEach(question => {
      if (question.validator) {
        form.addFieldValidator(question.id, question.validator);
      } else if (question.required) {
        form.addFieldValidator(question.id, (value) => {
          if (!value || (Array.isArray(value) && value.length === 0) || value === '') {
            return \`\${question.text} is required\`;
          }
          return undefined;
        });
      }
    });
  }
  
  // Function to update question visibility
  function updateQuestionVisibility() {
    const form = kinlink.formApi;
    const values = form.getAllValues();
    
    SURVEY_CONFIG.questions.forEach(question => {
      if (question.showIf) {
        const shouldShow = question.showIf(values);
        
        if (shouldShow) {
          form.showField(question.id);
        } else {
          form.hideField(question.id);
          
          // Clear the value when hiding the field
          form.setFieldValue(question.id, '');
        }
      }
    });
  }
  
  // Validate the form before submission
  kinlink.events.on(kinlink.FormEvents.BEFORE_SUBMIT, (data) => {
    const form = kinlink.formApi;
    const values = form.getAllValues();
    
    // Validate only visible questions
    const visibleQuestions = SURVEY_CONFIG.questions.filter(question => {
      if (!question.showIf) return true;
      return question.showIf(values);
    });
    
    let isValid = true;
    
    visibleQuestions.forEach(question => {
      if (question.required) {
        const value = values[question.id];
        const isEmpty = !value || (Array.isArray(value) && value.length === 0) || value === '';
        
        if (isEmpty) {
          form.setFieldError(question.id, \`\${question.text} is required\`);
          isValid = false;
        }
      }
      
      if (question.validator) {
        const error = question.validator(values[question.id]);
        if (error) {
          form.setFieldError(question.id, error);
          isValid = false;
        }
      }
    });
    
    if (!isValid) {
      form.showError('Please fix the validation errors before submitting.');
      return false;
    }
    
    // Add metadata to submission
    data.values.submittedAt = new Date().toISOString();
    
    return true;
  });
  
  // Handle successful submission
  kinlink.events.on(kinlink.FormEvents.AFTER_SUBMIT, (data) => {
    const { success } = data;
    const form = kinlink.formApi;
    
    if (success) {
      form.showSuccess('Thank you for completing the survey!');
    } else {
      form.showError('There was an error submitting the survey. Please try again.');
    }
  });
})();`}
          language="javascript"
          filename="dynamic-survey.js"
          showLineNumbers={true}
        />

        <h2>How It Works</h2>
        <p>
          This example creates a dynamic customer satisfaction survey that adapts to the user's responses. The survey
          includes different question types (radio buttons, checkboxes, text inputs, etc.) and uses conditional logic to
          show or hide questions based on previous answers.
        </p>

        <h3>Survey Configuration</h3>
        <p>The survey is configured using a JavaScript object that defines:</p>
        <ul>
          <li>Survey title and description</li>
          <li>Questions with their types, options, and validation rules</li>
          <li>Conditional logic for showing/hiding questions</li>
        </ul>

        <h3>Key Implementation Details</h3>
        <ul>
          <li>
            <strong>Conditional Questions:</strong> Questions are shown or hidden based on previous answers
          </li>
          <li>
            <strong>Custom Validation:</strong> Each question can have its own validation rules
          </li>
          <li>
            <strong>Dynamic UI:</strong> Rating questions have custom styling and interactive behavior
          </li>
          <li>
            <strong>Form Submission:</strong> Only visible and required questions are validated before submission
          </li>
        </ul>

        <h2>Best Practices</h2>
        <ul>
          <li>
            <strong>Progressive Disclosure:</strong> Only show questions that are relevant to the user
          </li>
          <li>
            <strong>Clear Instructions:</strong> Provide clear instructions and indicate required fields
          </li>
          <li>
            <strong>Immediate Feedback:</strong> Validate responses in real-time
          </li>
          <li>
            <strong>Logical Flow:</strong> Organize questions in a logical sequence
          </li>
          <li>
            <strong>Responsive Design:</strong> Ensure the survey works well on all devices
          </li>
        </ul>

        <h2>Customization Options</h2>
        <p>This example can be customized in several ways:</p>
        <ul>
          <li>Add or modify questions in the survey configuration</li>
          <li>Change the question types and validation rules</li>
          <li>Customize the appearance of questions and options</li>
          <li>Implement more complex branching logic</li>
          <li>Add progress tracking and navigation</li>
        </ul>

        <div className="mt-8">
          <Link href="/examples">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Examples
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
