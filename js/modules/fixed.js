function FixedHeader(options) {
    this.simpleMode = options.simpleMode || false;
    this.offset = options.offset || 0;
    this.onlyToTop = options.onlyToTop || true;
    this.target = document.querySelector(options.target) || document.querySelector('.fixed-block');
    this.fixedClass = options.fixedClass || 'fixed';
    this.wrapClass = options.wrapClass || 'fixed-wrapper';

    let self = this;

    let wrapperBlock = wrapper();
    let scrolling = 0;

    function wrapper() {
        let wrapper = document.createElement('div');
        wrapper.classList.add(self.wrapClass);
        let targetParent = self.target.parentNode;
        let nextNode = self.target.nextSibling;
        if(nextNode.nodeType !== 1) {
            nextNode = nextNode.nextSibling;
        }
        targetParent.insertBefore(wrapper, self.target);
        wrapper.appendChild(self.target);
        return wrapper;
    }

    function setHeight(elem) {
        let targetHeight = self.target.offsetHeight;
        elem.style.height = `${targetHeight}px`;
    }

    function toggleFixedClass() {
        if (window.pageYOffset === 0) {
            self.target.classList.remove(self.fixedClass);
        } else {
            self.target.classList.add(self.fixedClass);
        }
    }

    setHeight(wrapperBlock);

    window.addEventListener('resize', () => {
        setHeight(wrapperBlock);
    });

    if (this.simpleMode) {
        this.onlyToTop = false;
        self.target.classList.add(self.fixedClass);
        // toggleFixedClass();

        // window.addEventListener('scroll', () => {
        //     scrolling = 1;
        // });

        // setInterval(function() {
        //     if (scrolling) {
        //         scrolling = 0;
        //         toggleFixedClass();
        //     }
        // }, 1);
    }

    if (this.onlyToTop) {
        self.target.classList.add(self.fixedClass);
        let windowHeight = window.innerHeight;
        let offset = 0;

        window.addEventListener('scroll', () => {
            if (pageYOffset > windowHeight) {
                let top = window.pageYOffset;
                if (top < offset) {
                    self.target.classList.remove('hide');
                } else if (top > offset) {
                    self.target.classList.add('hide');
                }
                offset = top;
            } else {
                self.target.classList.remove('hide');
            }
        });
    }
}

export default FixedHeader;