function FixedHeader(options) {
    this.simpleMode = options.simpleMode || true;
    this.offset = options.offset || 0;
    this.onlyToTop = options.onlyToTop || false;
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

    function addClass() {
        self.target.classList.add(self.fixedClass);
    }

    function removeClass() {
        self.target.classList.remove(self.fixedClass);
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
        toggleFixedClass();

        window.addEventListener('scroll', () => {
            scrolling = 1;
        });

        setInterval(function() {
            if (scrolling) {
                scrolling = 0;
                toggleFixedClass();
            }
        }, 20);
    }

}

export default FixedHeader;