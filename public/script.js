/* eslint-disable no-undef */
/*
 *   This content is licensed according to the W3C Software License at
 *   https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
 *
 *   Simple accordion pattern example
 */

'use strict'

Array.prototype.slice.call(document.querySelectorAll('.Accordion')).forEach(function(accordion) {
  // Create the array of toggle elements for the accordion group
  var triggers = Array.prototype.slice.call(accordion.querySelectorAll('.Accordion-trigger'))

  accordion.addEventListener('click', function(event) {
    var target = event.target

    if (target.classList.contains('Accordion-trigger')) {
      // Check if the current toggle is expanded.
      var isExpanded = target.getAttribute('aria-expanded') == 'true'

      if (!isExpanded) {
        // Set the expanded state on the triggering element
        target.setAttribute('aria-expanded', 'true')
        // Hide the accordion sections, using aria-controls to specify the desired section
        document.getElementById(target.getAttribute('aria-controls')).removeAttribute('hidden')

        document.getElementById(target.id).querySelector('.Accordion-trigger-label').textContent =
          'Hide'
      } else if (isExpanded) {
        // Set the expanded state on the triggering element
        target.setAttribute('aria-expanded', 'false')
        // Hide the accordion sections, using aria-controls to specify the desired section
        document.getElementById(target.getAttribute('aria-controls')).setAttribute('hidden', '')

        document.getElementById(target.id).querySelector('.Accordion-trigger-label').textContent =
          'Show'
      }

      event.preventDefault()
    }
  })

  // Bind keyboard behaviors on the main accordion container
  accordion.addEventListener('keydown', function(event) {
    var target = event.target
    var key = event.which.toString()

    // 33 = Page Up, 34 = Page Down
    var ctrlModifier = event.ctrlKey && key.match(/33|34/)

    // Is this coming from an accordion header?
    if (target.classList.contains('Accordion-trigger')) {
      // Up/ Down arrow and Control + Page Up/ Page Down keyboard operations
      // 38 = Up, 40 = Down
      if (key.match(/38|40/) || ctrlModifier) {
        var index = triggers.indexOf(target)
        var direction = key.match(/34|40/) ? 1 : -1
        var length = triggers.length
        var newIndex = (index + length + direction) % length

        triggers[newIndex].focus()

        event.preventDefault()
      } else if (key.match(/35|36/)) {
        // 35 = End, 36 = Home keyboard operations

        /* eslint-disable indent */
        switch (key) {
          // Go to first accordion
          case '36':
            triggers[0].focus()
            break
          // Go to last accordion
          case '35':
            triggers[triggers.length - 1].focus()
            break
        }
        /* eslint-enable indent */

        event.preventDefault()
      }
    }
  })

  // These are used to style the accordion when one of the buttons has focus
  accordion.querySelectorAll('.Accordion-trigger').forEach(function(trigger) {
    trigger.addEventListener('focus', function() {
      accordion.classList.add('focus')
    })

    trigger.addEventListener('blur', function() {
      accordion.classList.remove('focus')
    })
  })
})
