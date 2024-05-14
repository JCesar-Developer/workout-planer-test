/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */
import { test } from 'playwright/test';

/**
 * A factory function to add a custom prefix to the test step.
 * @param prefix The prefix to prepend to the message.
 * @returns A decorator function.
 */
function createTestStep(prefix: string) {
  /**
   * A factory function to add the custom message to the test step.
   * @param message The report message for the test step.
   * @returns A decorator function.
   */
  return function(message: string) {
    /**
     * The decorator function that wraps the original method with a test step.
     * @param target The class or object containing the method.
     * @param propertyKey The name of the method.
     * @param descriptor The property descriptor of the method.
     * @returns The modified wrapped function.
     * 
     * {@link https://www.typescriptlang.org/docs/handbook/decorators.html More Information} 
     */
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
      // Define a new wrapped body to replace the original body method
      const newDescriptor = async function(this: unknown, ...args: any[]) {
        const stepMessage = getMessage(prefix, message, args); // Generate the report message
        await test.step(stepMessage, async () => {
            await target.apply(this, args); // Injects the original method with the provided arguments
        });
      };
      
      return newDescriptor as PropertyDescriptor; // Return the modified body
    }
  }
}

/**
 * Replaces placeholders in a message with corresponding arguments.
 * @param prefix The prefix to prepend to the message.
 * @param message The message with or without placeholders.
 * @param args The arguments to replace the placeholders.
 * @returns The formatted message.
 */
function getMessage(prefix: string, message: string, args: any[]): string {
  // Regular expression to match placeholders like {{0}}, {{1}}, etc.
  const regex = /{{\s*(\d+)\s*}}/g;
  let match;
  // Iterate over matches and replace placeholders with arguments
  while ((match = regex.exec(message)) !== null) {
      const index = parseInt(match[1]) - 1;
      if (index < 0 || index >= args.length) {
          // Replace with "unknown" if argument index is out of range
          message = message.replace(match[0], '"unknown"');
      } else {
          // Replace with the corresponding argument
          message = message.replace(match[0], args[index]);
      }
  }
  // Prepend the prefix to the formatted message
  return prefix + ' ' + message;
}

export const And = createTestStep('And');
export const But = createTestStep('But');
export const Given = createTestStep('Given');
export const Then = createTestStep('Then');
export const When = createTestStep('When');

/* eslint-enable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */