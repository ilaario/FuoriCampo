import pandas as pd

def convert_net_transfer_record(value):
    """
    Converte una stringa di valore di trasferimento netto in un numero in formato float.

    La funzione gestisce valori contenenti 'm' per milioni e 'k' per migliaia,
    e rimuove i simboli di valuta (€) e i segni più (+).

    Args:
        value (str): Una stringa rappresentante il valore di trasferimento netto da convertire.

    Returns:
        float: Il valore convertito in formato float. Restituisce None se il valore è NaN o se si verifica un'eccezione durante la conversione.
    """
    # Se il valore è NaN, ritorna None
    if pd.isna(value):
        return None
    try:
        # Se il valore contiene 'm', converti da milioni
        if 'm' in value:
            value = value.replace('€', '').replace('m', '').replace('+', '')
            value = float(value) * 1e6
        # Se il valore contiene 'k', converti da migliaia
        elif 'k' in value:
            value = value.replace('€', '').replace('k', '').replace('+', '')
            value = float(value) * 1e3
        # Altrimenti, rimuovi '€' e '+' e converti direttamente
        else:
            value = value.replace('€', '').replace('+', '')
            value = float(value)
        return value
    except:
        return None
