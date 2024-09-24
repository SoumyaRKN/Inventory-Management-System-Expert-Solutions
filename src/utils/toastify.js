import { Bounce, toast } from 'react-toastify';

/**
 * options keys :
 * position (default "top-right"), 
 * autoClose (default 3000) in miliseconds, 
 * hideProgressBar (default false), 
 * closeOnClick (default true), 
 * pauseOnHover (default true), 
 * draggable (default true), 
 * progress (default undefined), 
 * theme (default "colored"), 
 * transition (default Bounce)
 * @param {String} message
 * @param {Object} options
 */
export const successAlert = (message, options = {}) => {
    const { position, autoClose, hideProgressBar, closeOnClick, pauseOnHover, draggable, progress, theme, transition } = options;

    toast.success(message, {
        position: position ? position : "top-right",
        autoClose: autoClose ? autoClose : 3000,
        hideProgressBar: hideProgressBar ? hideProgressBar : false,
        closeOnClick: closeOnClick ? closeOnClick : true,
        pauseOnHover: pauseOnHover ? pauseOnHover : true,
        draggable: draggable ? draggable : true,
        progress: progress ? progress : undefined,
        theme: theme ? theme : "colored",
        transition: transition ? transition : Bounce,
    });
};

/**
 * options keys :
 * position (default "top-right"), 
 * autoClose (default 3000) in miliseconds, 
 * hideProgressBar (default false), 
 * closeOnClick (default true), 
 * pauseOnHover (default true), 
 * draggable (default true), 
 * progress (default undefined), 
 * theme (default "colored"), 
 * transition (default Bounce)
 * @param {String} message
 * @param {Object} options
 */
export const errorAlert = (message, options = {}) => {
    const { position, autoClose, hideProgressBar, closeOnClick, pauseOnHover, draggable, progress, theme, transition } = options;

    toast.error(message, {
        position: position ? position : "top-right",
        autoClose: autoClose ? autoClose : 3000,
        hideProgressBar: hideProgressBar ? hideProgressBar : false,
        closeOnClick: closeOnClick ? closeOnClick : true,
        pauseOnHover: pauseOnHover ? pauseOnHover : true,
        draggable: draggable ? draggable : true,
        progress: progress ? progress : undefined,
        theme: theme ? theme : "colored",
        transition: transition ? transition : Bounce,
    });
};