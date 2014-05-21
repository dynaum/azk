import { _ } from 'azk';
import { UI as OriginalUI } from 'azk/cli/command';

export function extend(h) {
  h.mockUI = function(func, outputs, extra) {
    // Mock UI
    var UI    = _.clone(OriginalUI);
    UI.dir    = (...args) => outputs.push(...args);
    UI.stdout = () => { return {
      write(data) {
        outputs.push(data.replace(/(.*)\n/, "$1"));
      }
    }};

    func(() => {
      while(outputs.length > 0) {
        outputs.pop();
      }

      if (extra)
        extra.call(this);
    });

    return UI;
  }
}


