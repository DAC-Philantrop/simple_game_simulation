Game currently works as follows:  
Deck starts with 24 Cards: 1-8 with 3 colors.    
Top 5 cards from the deck are visible to the player.  
Player can combine exactly 3 of the visible cards iff they are either sequential or equal in numerical values.  
Combined cards get deleted from the deck.  
Player gets points for a combination:  
    - 1 for combination with different colors.   
    - 100 for a combination where all 3 cards have the same color  
The Player MAY trash one of the visible cards to remove it from the deck.  
  
The implemented [Player](player.ts) always takes the first combination he sees, otherwise he trashes the topmost Card.  