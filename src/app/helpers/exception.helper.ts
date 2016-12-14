import { ErrorHandler } from '@angular/core';
import { Utilities } from '@microsoft/office-js-helpers';

/**
 * A class for signifying that an error is a "handleable" error that comes from the playground,
 * as opposed to an error that comes from some internal operation or runtime error.
 */
export class PlaygroundError extends Error {
    innerError: Error;

    /**
     * @constructor
     *
     * @param message Error message to be propagated.
    */
    constructor(message: string, error?: Error) {
        super(message);
        this.innerError = error;
        this.name = 'Playground Error';
        this.message = message;
        if ((Error as any).captureStackTrace) {
            (Error as any).captureStackTrace(this, this.constructor);
        }
        else {
            let error = new Error();
            if (error.stack) {
                let last_part = error.stack.match(/[^\s]+$/);
                this.stack = `${this.name} at ${last_part}`;
            }
        }
    }
}


export class ExceptionHandler implements ErrorHandler {
    handleError(exception: any, stackTrace?: any, reason?: string) {
        Utilities.log(exception);
        // appInsights.trackException(exception, 'Global Exception Handler', { 'global': 'true' });
        // UxUtil.showErrorNotification('An unexpected error occurred.', [], exception);
    }
}

export const EXCEPTION_PROVIDER = { provide: ErrorHandler, useClass: ExceptionHandler };